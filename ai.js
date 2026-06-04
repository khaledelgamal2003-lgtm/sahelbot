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
    // AIRPORT
    // =====================

    if (
        text.includes("مطار") ||
        text.includes("airport") ||
        text.includes("توصيل")
    ) {
        return "airport";
    }

    // =====================
    // PAYMENT
    // =====================

    if (
        text.includes("ادفع") ||
        text.includes("دفع") ||
        text.includes("احاسب") ||
        text.includes("payment") ||
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
        text.includes("karll")
    ) {
        return "karl";
    }

    
    if (
        text.includes("notch") ||
        text.includes("notchh") ||
        text.includes("نوتش") ||
        text.includes("نوتشش")
    ) {
        return "notch";
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