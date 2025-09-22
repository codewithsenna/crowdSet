"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Loader2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { getFestivals } from "@/services/festivalService"
import { Festival } from "@/types/festival.types"

export default function FeaturedFestivals() {
    const [festivals, setFestivals] = useState<Festival[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [city, setCity] = useState<string>("Toronto")

    // 🌍 Auto-detect city from IP
    useEffect(() => {
        const fetchCity = async () => {
            try {
                const res = await fetch("https://ipapi.co/json/")
                const data = await res.json()
                if (data.city) {
                    setCity(data.city)
                }
            } catch (err) {
                console.error("IP location fetch failed:", err)
            }
        }
        fetchCity()
    }, [])

    // 🎫 Fetch festivals when city changes
    useEffect(() => {
        const load = async () => {
            setLoading(true)
            try {
                const data = await getFestivals(city)
                setFestivals(data)
                setError(null)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        if (city) load()
    }, [city])

    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="mb-16">
                    <h2 className="text-4xl font-bold tracking-tight">
                        Featured <span className="text-primary">Festivals</span>
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Discover iconic music festivals and who played there.
                    </p>
                </div>

                {/* 🔍 Manual search input */}
                <div className="mb-8 flex items-center gap-2">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search by city..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="bg-background border-border/50 focus:border-primary/50"
                    />
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}

                {error && <p className="text-red-500 text-center">{error}</p>}

                {!loading && !error && festivals.length === 0 && (
                    <p className="text-center text-muted-foreground">
                        No festivals found for "{city}".
                    </p>
                )}

                {!loading && !error && festivals.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {festivals.map((festival) => (
                            <Card
                                key={festival.id}
                                className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                            >
                                {/* 🎨 Image & gradient */}
                                <div className="relative aspect-video overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
                                    {festival.image ? (
                                        <div
                                            className="absolute inset-0 bg-cover bg-center opacity-70"
                                            style={{ backgroundImage: `url(${festival.image})` }}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-[url('/concert-stage-lights-crowd-silhouette.png')] bg-cover bg-center opacity-30" />
                                    )}
                                </div>

                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xl font-semibold">{festival.name}</h3>
                                        <Badge variant="outline">{festival.year}</Badge>
                                    </div>
                                    <div className="flex items-center text-muted-foreground text-sm mb-1">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        {festival.city}, {festival.country}
                                    </div>
                                    <div className="flex items-center text-muted-foreground text-sm">
                                        <Users className="h-4 w-4 mr-2" />
                                        {festival.totalConcerts} shows
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
