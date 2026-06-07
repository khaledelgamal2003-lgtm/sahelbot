function detectIntent(text = "") {

    text = text.toLowerCase().trim();

    // =====================
    // QR
    // =====================

    if (
        text === "qr" ||
        text === "كيو ار" ||
        text === "qr prices" ||
        text === "اسعار الكيو ار" ||
        text === "الكيو ار"
    ) {
        return "qr";
    }

    // =====================
    // MARASSI
    // =====================

    if (
        text.includes("مراسي") ||
        text.includes("المراسي") ||
        text.includes("مراسى") ||
        text.includes("لمراسي") ||
        text.includes("لمراسى") ||
        text.includes("marassi") ||
        text.includes("marrasi") ||
        text.includes("mrassi")
    ) {
        return "marassi";
    }

    // =====================
    // MARINA
    // =====================

    if (
        text.includes("مارينا") ||
        text.includes("المارينا") ||
        text.includes("لمارينا") ||
        text.includes("marina")
    ) {
        return "marina";
    }

    // =====================
    // AMWAJ
    // =====================

    if (
        text.includes("امواج") ||
        text.includes("أمواج") ||
        text.includes("amwaj")
    ) {
        return "amwaj";
    }

    // =====================
    // SEASHELL
    // =====================

    if (
        text.includes("سيشيل") ||
        text.includes("سيشل") ||
        text.includes("sea shell") ||
        text.includes("seashell")
    ) {
        return "seashell";
    }

    // =====================
    // HACIENDA BAY
    // =====================

    if (
        text.includes("هاسيندا") ||
        text.includes("هايسيندا") ||
        text.includes("هايسندا") ||
        text.includes("hacienda bay") ||
        text.includes("hacindabay")
    ) {
        return "hacienda_bay";
    }

    // =====================
    // HACIENDA White
    // =====================

        if (
        text.includes("white") ||
        text.includes("وايت")
    ) {
        return "hacienda_white";
    }

    // =====================
    // HACIENDA RED
    // =====================

        if (
        text.includes("red") ||
        text.includes("ريد")
    ) {
        return "hacienda_red";
    }

    // =====================
    // Mountain view
    // =====================

    if (
        text.includes("mountainview") ||
        text.includes("mountain view") ||
        text.includes("mv") ||
        text.includes("ماونتين") ||
        text.includes("ماونتن")
    ) {
        return "mountain_view";
    }

    // =====================
    // JETSKI
    // =====================

    if (
        text.includes("جيتسكي") ||
        text.includes("الجيتسكي") ||
        text.includes("جيت سكي") ||
        text.includes("الجيت سكي") ||
        text.includes("جيتسكى") ||
        text.includes("الجيتسكى") ||
        text.includes("جيت سكى") ||
        text.includes("الجيت سكى") ||
        text.includes("jetski") ||
        text.includes("jet ski")
    ) {
        return "jetski";
    }

    // =====================
    // YACHT
    // =====================

    if (
        text.includes("يخت") ||
        text.includes("اليخت") ||
        text.includes("اليخوت") ||
        text.includes("ليخت") ||
        text.includes("ليخوت") ||
        text.includes("يخوت") ||
        text.includes("yacht") ||
        text.includes("boat")
        
    ) {
        return "yacht";
    }

    // =====================
    // HOTELS
    // =====================

    if (
        text.includes("فندق") ||
        text.includes("فنادق") ||
        text.includes("لفندق") ||
        text.includes("لفنادق") ||
        text.includes("hotel") ||
        text.includes("hotels")
    ) {
        return "hotel";
    }

    // =====================
    // RESTAURANTS
    // =====================

    if (
        text.includes("مطعم") ||
        text.includes("مطاعم") ||
        text.includes("لمطعم") ||
        text.includes("لمطاعم") ||
        text.includes("restaurant") ||
        text.includes("food")
    ) {
        return "restaurant";
    }

    // =====================
    // CARS
    // =====================

    if (
        text.includes("عربية") ||
        text.includes("عربيه") ||
        text.includes("عربيات") ||
        text.includes("car") ||
        text.includes("سياره") ||
        text.includes("سيارة") ||
        text.includes("سيارات") ||
        text.includes("cars")
    ) {
        return "cars";
    }

    // =====================
    // PARTY
    // =====================

    if (
        text.includes("حفله") ||
        text.includes("حفل") ||
        text.includes("حفلة") ||
        text.includes("حفلات") ||
        text.includes("الحفله") ||
        text.includes("الحفلة") ||
        text.includes("الحفل") ||
        text.includes("party") ||
        text.includes("parties") ||
        text.includes("الحفلات")
    ) {
        return "party";
    }

    // =====================
    // PAYMENT
    // =====================

    if (
        text.includes("دفع") ||
        text.includes("pay")
    ) {
        return "payment";
    }

    // =====================
    // PRICE
    // =====================

    if (
        text.includes("سعر") ||
        text.includes("اسعار") ||
        text.includes("أسعار") ||
        text.includes("الاسعار") ||
        text.includes("الأسعار") ||
        text.includes("بكام") ||
        text.includes("كام") ||
        text.includes("price") ||
        text.includes("prices")
    ) {
        return "prices";
    }

    // =====================
    // SUPPORT
    // =====================

    if (
        text.includes("خدمة العملاء") ||
        text.includes("خدمه العملاء") ||
        text.includes("اكلم حد") ||
        text.includes("تواصل") ||
        text.includes("التواصل") ||
        text.includes("support") ||
        text.includes("human")
    ) {
        return "support";
    }

    // =====================
    // GREETINGS
    // =====================
/*
    if (
        text.includes("السلام") ||
        text.includes("اهلا") ||
        text.includes("هاي") ||
        text.includes("hello") ||
        text.includes("hi")
    ) {
        return "greeting";
    }
*/

//-------------------------------------beaches-------------------------


    if (
        text.includes("karl") ||
        text.includes("كارل") ||
        text.includes("كرل") ||
        text.includes("لكارل") ||
        text.includes("لكرل") ||
        text.includes("karll")
    ) {
        return "karl";
    }

    
    if (
        text.includes("noya") ||
        text.includes("noia") ||
        text.includes("noyaa") ||
        text.includes("تويا") ||
        text.includes("نويا") ||
        text.includes("لنويا")
    ) {
        return "noya";
    }

    /*
    if (
        text.includes("عربية") ||
        text.includes("عربيات") ||
        text.includes("car") ||
        text.includes("سياره") ||
        text.includes("سيارة") ||
        text.includes("سيارات") ||
        text.includes("cars")
    ) {
        return "cars";
    }
*/




















    return null;
}

module.exports = detectIntent;