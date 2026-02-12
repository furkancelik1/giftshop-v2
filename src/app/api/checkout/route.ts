import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
    try {
        // 1. Anahtar Kontrolü
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error("HATA: STRIPE_SECRET_KEY bulunamadı! .env.local dosyanı kontrol et.");
            return NextResponse.json({ error: "API Key Eksik" }, { status: 500 });
        }

        // 2. Stripe Başlatma (Versiyon hatası için düzeltme yapıldı)
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2026-01-28.clover" as any, // TypeScript hatasını susturmak için 'as any' ekledik
            typescript: true,
        });

        const { items } = await request.json();

        // 3. Sepet Boş mu?
        if (!items || items.length === 0) {
            return NextResponse.json({ error: "Sepet boş" }, { status: 400 });
        }

        // 4. Veriyi Stripe Formatına Çevir
        const lineItems = items.map((item: any) => {
            // Görsel URL'si geçerli mi kontrol et (http ile başlıyorsa al, yoksa boş ver)
            const validImage = item.imageUrl && item.imageUrl.startsWith("http")
                ? [item.imageUrl]
                : [];

            return {
                price_data: {
                    currency: "try",
                    product_data: {
                        name: item.name,
                        images: validImage,
                    },
                    unit_amount: Math.round(item.price * 100), // Kuruş hesabı
                },
                quantity: item.quantity,
            };
        });

        // 5. Oturumu Başlat
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get("origin")}/`,
        });

        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        console.error("STRIPE API HATASI:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}