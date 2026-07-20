


//to recive data
const bookingRequests = {};


//AI
const detectIntent = require("./ai");

//saving data
const fs = require("fs");

function saveData() {
    fs.writeFileSync(
        "data.json",
        JSON.stringify({
            userState,
            pausedUsers,
            waitingNote
        }, null, 2)
    );
}











const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const qrcode = require("qrcode-terminal");
const pino = require("pino");
//qr_en
async function startBot() {

    const { state, saveCreds } = await useMultiFileAuthState("auth");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: "silent" })
    });

    sock.ev.on("creds.update", saveCreds);

    // =========================
    // CONNECTION
    // =========================
    sock.ev.on("connection.update", async (update) => {
        const { connection, qr } = update;

        if (qr) {
            console.log("📱 Scan QR:");
            qrcode.generate(qr, { small: true });
        }

        if (connection === "open") {
            console.log("✅ Bot Connected");
        }

        if (connection === "close") {
            console.log("❌ Connection closed - restarting...");
            startBot();
        }
    });

    // =========================
    // STATE
    // =========================
    const userState = {};
    const userLock = {};


// =========================
// ADMIN SETTINGS
// =========================


// PAYMENT PAUSED USERS
let paymentPausedUsers = {};

try {

    paymentPausedUsers = JSON.parse(
        fs.readFileSync("payment_paused.json")
    );

} catch {

    paymentPausedUsers = {};
}

function savePaymentPausedUsers() {

    fs.writeFileSync(
        "payment_paused.json",
        JSON.stringify(paymentPausedUsers, null, 2)
    );
}

// العملاء الموقوفين
let pausedUsers = {};

try {

    pausedUsers = JSON.parse(
        fs.readFileSync("paused.json")
    );

} catch {

    pausedUsers = {};
}

function savePausedUsers() {

    fs.writeFileSync(
        "paused.json",
        JSON.stringify(pausedUsers, null, 2)
    );
}






// =========================
// ADMIN NUMBER
// =========================

const ADMIN_NUMBER = "201000992177";

// waiting note
const waitingNote = {};



    sock.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0];
        if (!msg.message) return;

        // تجاهل الرسائل القديمة
        if (!msg.messageTimestamp) return;

        if (
            msg.key.id?.startsWith("BAE5") ||
            msg.key.id?.startsWith("3EB0")
        ) {
            return;
        }

        const user = ( msg.key.remoteJidAlt ||
            msg.key.participant ||
            msg.key.remoteJid
        )
            .replace(/:.*$/, "")
            .replace(/@lid/g, "@s.whatsapp.net");
        if (!user) return;

// تجاهل رسائل البوت نفسه
if (msg.key.fromMe) return;
        // تجاهل الجروبات
        if (user.endsWith("@g.us")) return;



        
        // استخراج الرقم
        const realUser =
        msg.key.remoteJidAlt ||
        msg.key.participant ||
        msg.key.remoteJid;

         const userNumber =
        realUser
        .replace(/:.*$/, "")
        .replace(/@.*/g, "");

        console.log("USER:", userNumber);
                
        // Block list
        const blockedNumbers = [];

        if (blockedNumbers.includes(userNumber)) {
            console.log("BLOCKED USER:", userNumber);
            return;
        }

        let text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        text = text.trim();
        const intent = detectIntent(text);



        text = text
    .replace(/٠/g, "0")
    .replace(/١/g, "1")
    .replace(/٢/g, "2")
    .replace(/٣/g, "3")
    .replace(/٤/g, "4")
    .replace(/٥/g, "5")
    .replace(/٦/g, "6")
    .replace(/٧/g, "7")
    .replace(/٨/g, "8")
    .replace(/٩/g, "9");

        const clean = text.replace(/[^0-9]/g, "");


// =========================
// PAYMENT MODE
// =========================

if (paymentPausedUsers[user]) {
    // admin bypass
    if ( userNumber === ADMIN_NUMBER || user === ADMIN_NUMBER + "@s.whatsapp.net" ) {
        // admin
        }

        else {
        // الرجوع للقائمة الرئيسية فقط
        if (clean === "0") { userState[user] = {
            step: "main_menu" };
            await sendMainMenu(user, sock);
            return;
        }
        
            // أي رسالة تانية
                return;
            }
        }












// =========================
// USER PAUSED
// =========================

if (pausedUsers[user]||paymentPausedUsers[user]) {

    // admin bypass
    if (
        userNumber === ADMIN_NUMBER ||
        user === ADMIN_NUMBER + "@s.whatsapp.net"
    ) {

        // admin bypass

    } else {

        const state = userState[user];

        // =========================
        // SUPPORT MODE
        // =========================

        if (state?.step === "support_mode") {

            // الرجوع للبوت
            if (clean === "1") {

                delete pausedUsers[user];
                delete paymentPausedUsers[user];
                savePausedUsers();
                savePaymentPausedUsers();
                userState[user] = {
                    step: "main_menu"
                };
                
                state.step = "main menu";



                return;
            }

            // القائمة الرئيسية
            if (clean === "0") {
                delete pausedUsers[user];
                delete paymentPausedUsers[user];
                savePaymentPausedUsers();
                savePausedUsers();

                //  الـ state 
                userState[user] = {step: "main_menu"};
                await sendMainMenu(user, sock);
                return;
            }

            // أي رسالة تانية
            await sock.sendMessage(user, {
                text:
`⏳ تم تحويلك لخدمة العملاء

1️⃣ للتحدث مع البوت
0️⃣ للقائمة الرئيسية`
            });

            return;
        }

        // =========================
        // NORMAL PAUSE
        // =========================

        if (clean === "0") {

            delete pausedUsers[user];
            delete paymentPausedUsers[user];

            savePausedUsers();
            savePaymentPausedUsers();
            userState[user] = {
                step: "main_menu"
            };

            await sendMainMenu(user, sock);

            return;
        }


        return;
    }
}




    

if (bookingRequests[user]) {

    const type = bookingRequests[user];

    await sock.sendMessage(
        ADMIN_NUMBER + "@s.whatsapp.net",
{
        text:
`📥 طلب جديد

👤 العميل:
${userNumber}

📌 الخدمة:
${type}

📝 التفاصيل:
${text}`
    });

    await sock.sendMessage(user, {
        text:
`✅ تم ارسال طلبك بنجاح

سيتم التواصل معك قريباً ❤️`
    });

    delete bookingRequests[user];

    return;
}
        // =========================
        // ADMIN PANEL FROM WHATSAPP
        // =========================

        if (userNumber === "201000992177") {

    // إيقاف عميل
    // مثال:
    // pause 201055555555

    if (text.startsWith("pause ")) {

        const target =
            text.replace("pause ", "")
            .replace(/[^0-9]/g, "") +
            "@s.whatsapp.net";

        pausedUsers[target] = true;

savePausedUsers();

        await sock.sendMessage(user, {
            text:
`⛔ Client paused successfully`
        });

        return;
    }

    // تشغيل عميل
    // مثال:
    // resume 201055555555

    if (text.startsWith("resume ")) {

        const target =
            text.replace("resume ", "")
            .replace(/[^0-9]/g, "") +
            "@s.whatsapp.net";

        delete pausedUsers[target];
        delete paymentPausedUsers[target];

        savePausedUsers();
        savePaymentPausedUsers();

        await sock.sendMessage(target, {
            text:
`📋 اكتب 0 للقائمة الرئيسية`
        });

        await sock.sendMessage(user, {
            text:
`✅ Client resumed successfully`
        });

        return;
    }

    // إرسال رسالة لعميل
    // مثال:
    // send 201055555555 اهلا بيك

    if (text.startsWith("send ")) {

        const args = text.split(" ");

        const number = args[1];

        const message =
            text.split(" ").slice(2).join(" ");

        await sock.sendMessage(
            number + "@s.whatsapp.net",
            {
                text: message
            }
        );

        await sock.sendMessage(user, {
            text:
`✅ Message sent successfully`
        });

        return;
    }
}



// =========================
// ADMIN COMMANDS
// =========================

// resume 2010xxxx
if (user === ADMIN_NUMBER && text.startsWith("resume ")) {

    const target = text.replace("resume ", "").trim();

    pausedUsers[target + "@s.whatsapp.net"] = false;
    paymentPausedUsers[target + "@s.whatsapp.net"] = false;
    await sock.sendMessage(
        target + "@s.whatsapp.net",
        {
            text:
`✅ تم استكمال المحادثة مع خدمة العملاء

📋 اكتب 0 للرجوع للقائمة الرئيسية`
        }
    );

    return;
}

// pause number
if (user === ADMIN_NUMBER && text.startsWith("pause ")) {

    const target = text.replace("pause ", "").trim();

    pausedUsers[target + "@s.whatsapp.net"] = true;

    return;
}

if (userNumber === ADMIN_NUMBER && text === "paused") {

    const pausedList = Object.keys(pausedUsers)
        .filter(user => pausedUsers[user]);

    if (pausedList.length === 0) {

        await sock.sendMessage(user, {
            text:
`✅ لا يوجد عملاء موقوفين`
        });

        return;
    }

    let message = "⛔ العملاء الموقوفين:\n\n";

    pausedList.forEach((u, i) => {

        const number =
        u.replace(/@.*/g, "");

        message += `${i + 1}- ${number}\n`;
    });

    await sock.sendMessage(user, {
        text: message
    });

    return;
}




// PAYMENT PAUSED LIST
if (userNumber === ADMIN_NUMBER && text === "paymentpaused") {

    const pausedList = Object.keys(paymentPausedUsers)
        .filter(user => paymentPausedUsers[user]);

    if (pausedList.length === 0) {

        await sock.sendMessage(user, {
            text:
`✅ لا يوجد عملاء دفع موقوفين`
        });

        return;
    }

    let message = "💳 العملاء الموقوفين بسبب الدفع:\n\n";

    pausedList.forEach((u, i) => {

        const number =
            u.replace(/@.*/g, "");

        message += `${i + 1}- ${number}\n`;
    });

    await sock.sendMessage(user, {
        text: message
    });

    return;
}



//====================================
//              FUNCTIONS
//====================================

//  QR FUNC
async function sendQR(user, sock) {

    await sock.sendMessage(user, {
        text:
`📲 اسعار الـ QR المتاحة:

📍 مارينا
📍 مراسي
📍 أمواج
📍 سيشيل
📍 هاسيندا باي
📍 هاسيندا وايت
📍 هاسيندا ريد
📍 تلال
📍 ماونتن فيو
📍 بورتو مارينا
📍 بورتو جولف

ابعت اسم المكان مباشرة ❤️`
    });
}

// YACHT JETSKI BOBOS FUNC
async function sendBobos(user, sock) {

    await sock.sendMessage(user, {
        text:
`اليخوت والجيتسكي غير متاحه للحجز حتي 30/7/2026
نعمل علي توفيرها في أقرب وقت`
    });    

/*
    await sock.sendMessage(user, {
        text:
`تأجير اليخوت والجيتسكي🛥️

المكان: New BOBOS Water Sports Spot

يتم دفع 500 جنيه جديه حجز ويتم خصمهم من اجمالي التكلفه`
    });    

        await sock.sendMessage(user, {
    document: {
        url: "BOBOS/BOBOS.pdf"
    },
    mimetype: "application/pdf",
    fileName: "BOBOS.pdf"
    });




    await sock.sendMessage(user, {
        text:
`https://maps.app.goo.gl/TPaZ4rMCwJne9kFg6`
    });
*/
    await sock.sendMessage(user, {
            text:
`0️⃣ القائمة الرئيسية كامله`
        });    
        
}




//BEACH FUNC
async function sendbeach(user, sock) {

await sock.sendMessage(user, {
            text:
`الشواطئ المتاحه للحجز

1️⃣ KARL beach new alamein
2️⃣ NOYA beach new alamein

9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ رجوع`
        });

}

//HOTEL FUNC
async function sendHotel(user, sock) {

    bookingRequests[user] = "hotel";

    await sock.sendMessage(user, {
        text:
`🏨 خدمة حجز الفنادق بأفضل الأسعار ✨

استمتع بإقامة فاخرة في أفخم فنادق الساحل الشمالي ❤️
وبسعر مخفض حصريا لدي شركتنا

متاح الحجز في:
📍 Rixos Premium Alamein
📍 Address Beach Resort Marassi
📍 Address Golf Resort Marassi
📍 Vida Marina Resort Marassi
📍 Palace Beach Resort Marassi
📍 Al Alamein Hotel Resort & Spa
📍 Porto Marina Hotel
📍 Tolip Resort Sunrays
📍 Regal Heights Hotel
📍 Crystal Inn Hotel
📍 Jaz Almaza Beach Resort

برجاء إرسال:
• عدد الأفراد
• تاريخ الوصول
• عدد الليالي
• اسم الفندق أو المنطقة المطلوبة

وسيتم التواصل معكم فورًا بأفضل العروض والأسعار ✨`
    });
}

//RESTUARANT FUNC
async function sendRestaurant(user, sock) {

    bookingRequests[user] = "restaurant";

    await sock.sendMessage(user, {
        text:
`🍽️ المطاعم المتاحة للحجز:

• Crave (Marassi)
• Ovio (Marassi)
• Eatery (Marassi)
• The Lemon Tree & Co.
• SACHI By The Sea
• Kiki's (Hacienda White)
• Boulevard (Seashell)
• il Nilo (Seashell)
• Izmir Saray Turkish (Seashell)
• White & Blue (Ghazala Bay)
• Aklet Samak  (in front of Marassi)
• Princess (O mall)


📝 برجاء ارسال:
- اسم المطعم
- عدد الأفراد
- اليوم
- فطار/غداء/عشاء`
    });
}


//CARS FUNC
async function sendCars(user, sock) {

    bookingRequests[user] = "cars";

    await sock.sendMessage(user, {
        text:
`🚗 خدمة تأجير السيارات الفارهة ✨

نوفر اسطول ضخم من السيارات بسائق او بدون لضمان راحتك❤️

🚘 Mercedes G63 BRABUS Kit
🚘 Mercedes S450
🚘 Mercedes S400
🚘 Mercedes E200
🚘 Mercedes C200 Cabrio
🚘 Mercedes C180
🚘 Range Rover Sport
🚘 Porsche Cayenne
🚘 Porsche Macan
🚘 Jeep Grand Cherokee Limited
🚘 Toyota Fortuner
🚘 Toyota Corolla
🚘 Kia Sportage
🚘 Jetour T2
🚘 Jetour Dashing
🚘 Hyundai Elantra
🚘 Nissan Sunny
🚘 MG 5
🚘 MG 6

برجاء إرسال:
• نوع السيارة المطلوبة
• مدة الإيجار
• مكان الاستلام
• تاريخ ووقت الاستلام

وسيتم التواصل معكم فورًا بأفضل العروض والأسعار ✨`
    });
}




//Chalets FUNC
async function sendchalets(user, sock) {

    bookingRequests[user] = "chalets";

    await sock.sendMessage(user, {
        text:
`🏖️ **خدمة تأجير الشاليهات والفلل في الساحل الشمالي** ✨

نوفر لكم مجموعة كبيرة من الشاليهات والفلل في أفضل قرى الساحل، مع أفضل الأسعار وخدمة حجز سريعة لضمان راحتكم ❤️

📍 متوفر في:
🏝️ Marina
🏝️ Marassi
🏝️ Hacienda Bay
🏝️ Hacienda White
🏝️ Seashell
🏝️ Amwaj
🏝️ La Vista Bay
🏝️ Mountain View Ras El Hekma
🏝️ Fouka Bay
🏝️ Telal North Coast
🏝️ Porto Golf
🏝️ Porto Marina

برجاء إرسال:
• اسم القرية المطلوبة
• عدد الأفراد
• تاريخ الوصول
• تاريخ المغادرة

وسيتم التواصل معكم فورًا بأفضل الوحدات والأسعار المناسبة لكم ✨`
    });
}
//PARTY FUNC
async function sendParty(user, sock) {

    bookingRequests[user] = "party";

    await sock.sendMessage(user, {
    document: {
        url: "Party/PARTY.pdf"
    },
    mimetype: "application/pdf",
    fileName: "PARTY.pdf"
    });

    await sock.sendMessage(user, {
        text:
`يرجاء الاطلاع علي الملف المرفق 
ثم اختيار:
الحفلة وعدد التذاكر
مع ايضاح اي تفاصيل او ملاحظات 
وسيقوم أحد ممثلي خدمة العملاء بالرد عليكم❤️`
    });
}


//PRICE FUNC
async function sendPrices(user, sock) {

    await sock.sendMessage(user, {
        text:
`💰 الأسعار تختلف حسب:

📍 المكان
📅 التاريخ
👥 عدد الأفراد

ابعت اسم الخدمة أو المكان لمعرفة السعر ❤️

او ابعت رقم 0 للقائمه الرئيسيه`
    });
}


// PAYMENT FUNC
async function handlePayment(user, userNumber, sock) {

    paymentPausedUsers[user] = true;

    savePaymentPausedUsers();

    await sock.sendMessage(
        ADMIN_NUMBER + "@s.whatsapp.net",
{
        text:
`💰 طلب دفع جديد

👤 الرقم:
${userNumber}

📍 العميل جاهز للدفع`
    });


    await sock.sendMessage(user, {
        image: { url: "QR/instructions.jpg" },
        caption:"تعليمات استخدام ال QR"
    });

    await sock.sendMessage(user, {
        text:
`✅ تم تحويل طلبك لخدمة العملاء

برجاء انتظار التواصل معك ❤️`
    });

    await sock.sendMessage(user, {
        text:
`طرق الدفع:
-في حاله طلب خدمه دفع قبل الدخول
يتم تحويل كامل المبلغ علي أحد الحسابات:
Instapay: 01000992177
Vodafone Cash: 01055855696
NBE Bank transfer: 4333011828405100010
مع إرفاق صورة التحويل هنا


-في حاله طلب خدمه دفع عند الوصول
يتم التواصل معنا قبل الوصول ب 30 دقيقه وسيكون في انتظارك أحد أفراد طاقم العمل علي البوابات لإتمام عملية الدخول والدفع

0️⃣ للقائمة الرئيسية`
    });
}

// MAIN MENU FUNC

async function sendMainMenu(user, sock) {

    await sock.sendMessage(user, {
        text:
`📋 القائمة الرئيسية

1️⃣ اسعار QR
2️⃣ الجيتسكي واليخوت
3️⃣ حجز الشاليهات والفلل
4️⃣ حجز الفنادق
5️⃣ حجز المطاعم
6️⃣ الحفلات والسهرات
7️⃣ تأجير السيارات

8️⃣ السياسات والشروط
9️⃣ للحجز وتحويل المحادثه لخدمة العملاء`
    });
}



//------beaches------------------------------------------------

//KARL
async function sendkarl(user, sock) {

    await sock.sendMessage(user, {
        text:
`حجوزات شاطئ كارل بيتش
مدينه العلمين الجديده`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });
}




//NOYA
async function sendnoya(user, sock) {

    await sock.sendMessage(user, {
        text:
`حجوزات شاطئ نويا بيتش
مدينه العلمين الجديده`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });
}







// =========================
// NOTE MODE
// =========================

if (waitingNote[user]) {

   await sock.sendMessage(
    ADMIN_NUMBER + "@s.whatsapp.net",
{
        text:
`📩 New Note

👤 Number:
${userNumber}

📝 Message:
${text}`
    });

    waitingNote[user] = false;

    await sock.sendMessage(user, {
        text:
`✅ شكراً ليك

تم استلام رسالتك وهيتم التواصل معاك في أقرب وقت ❤️

0️⃣ القائمة الرئيسية`
    });

    return;
}



        // anti spam بسيط
        if (userLock[user]) return;
        userLock[user] = true;
        setTimeout(() => delete userLock[user], 1000);



if (intent === "qr") {
    await sendQR(user, sock);
    return;
}

if (intent === "chalet") {
    await sendchalets(user, sock);
    return;
}



if (intent === "marina") {

    await sock.sendMessage(user, {
        image: { url: "QR/marina.jpg" },
        caption: `📍 QR مارينا

Instapay or Vodafone Cash قبل الدخول:
🚗 250 جنيه للعربية

دفع عند الوصول:
🚗 400 جنيه للعربية`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });

    return;
}


if (intent === "marassi") {


    await sock.sendMessage(user, {
        image: { url: "QR/Marassi/marina1.jpeg" },
        caption: `مراسي مارينا ✨:

Instapay or Vodafone Cash قبل الدخول:
1000 جنيه للعربية 🚗

دفع عند الوصول:
1400 جنيه للعربيه 🚗`
    });

    await sock.sendMessage(user, {
        image: { url: "QR/Marassi/north1.jpeg" },
        caption: `نورث بيتش 🏖️:

Instapay or Vodafone Cash قبل الدخول:
1200 جنيه للفرد

دفع عند الوصول:
1500 جنيه للفرد

note:
لا يشمل qr البوابه الخارجيه`
    });


    await sock.sendMessage(user, {
        image: { url: "QR/Marassi/blancalagoon.jpeg" },
        caption: `مراسي بلانكا 🏝️:

Instapay or Vodafone Cash قبل الدخول:
2500 جنيه للعربيه 🚗

دفع عند الوصول:
3000 جنيه للعربيه 🚗

note:
لا يشمل qr البوابه الخارجيه`
    });

    await sock.sendMessage(user, {
        image: { url: "QR/Marassi/marinalagoon.jpg" },
        caption: `حمامات سباحه المارينا  🏝️:

Instapay or Vodafone Cash قبل الدخول:
600 جنيه للفرد

دفع عند الوصول:
800 جنيه للفرد

note:
لا يشمل qr البوابه الخارجيه`
    });


    await sock.sendMessage(user, {
        image: { url: "QR/Marassi/ClubHouse.jpeg" },
        caption: ` كلوب هاوس بيتش 🏖️:

Instapay or Vodafone Cash قبل الدخول:
2500 جنيه للفرد

دفع عند الوصول:
3500 جنيه للفرد

note:
لا يشمل qr البوابه الخارجيه`
    });


    await sock.sendMessage(user, {
        image: { url: "QR/Marassi/Safi.jpeg" },
        caption: ` صافي بيتش 🏖️:

Instapay or Vodafone Cash قبل الدخول:
4500 جنيه للفرد

دفع عند الوصول:
5000 جنيه للفرد

note:
لا يشمل qr البوابه الخارجيه`
    });

    await sock.sendMessage(user, {
        image: { url: "QR/Marassi/waterworld.jpeg" },
        caption: ` مراسي واتر وورلد 🏝️:

تذكره لشخص بالغ:
2500 جنيه

تذكره لطفل أقصر من 120 سم:
2000 جنيه

note:
السعر يشمل qr البوابه الخارجيه
الأطفال أطول من 120 سم يتم احتسابهم بالغين`
    });    
    

    await sock.sendMessage(user, {
        image: { url: "QR/Marassi/hub.jpeg" },
        caption: `THE HUB MARASSI

غير متاح حاليا`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });

    return;
}

if (intent === "amwaj") {

    await sock.sendMessage(user, {
        image: { url: "QR/amwaj1.jpeg" },
        caption: `📍 QR أمواج
        
Instapay or Vodafone Cash قبل الدخول:
900 جنيه للفرد

يشمل:
🏖️ البحر
🏝️ اللاجون
🏊 البول`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });

    return;
}

if (intent === "seashell") {


    await sock.sendMessage(user, {
        image: { url: "QR/seashell2.jpeg" },
        caption: `📍 QR سيشيل

Instapay or Vodafone Cash قبل الدخول:
1500 جنيه للفرد

دفع عند الوصول:
1900 جنيه للفرد

يشمل:
🏖️ البحر
🏝️ اللاجون
🏊 البول`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });

    return;
}

if (intent === "hacienda_bay") {

    await sock.sendMessage(user, {
        image: { url: "QR/haceindabay1.jpeg" },
        caption: `📍 QR هاسيندا باي

Instapay or Vodafone Cash قبل الدخول:
700 جنيه للفرد

دفع عند الوصول:
900 جنيه للفرد

يشمل:
🏖️ البحر
🏝️ اللاجون
🏊 البول`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });

    return;
}

if (intent === "hacienda_white") {

    await sock.sendMessage(user, {
        image: { url: "QR/haceindawhite1.jpeg" },
        caption: `📍 QR هاسيندا وايت

Instapay or Vodafone Cash قبل الدخول:
1500 جنيه للفرد

دفع عند الوصول:
1900 جنيه للفرد

يشمل:
🏖️ البحر
🏝️ اللاجون
🏊 البول`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });

    return;
}


if (intent === "hacienda_red") {

        await sock.sendMessage(user, {
        image: { url: "QR/haceindared1.jpeg" },
        caption: `📍 QR هاسيندا ريد

Instapay or Vodafone Cash قبل الدخول:
1500 جنيه للفرد

دفع عند الوصول:
1900 جنيه للفرد

يشمل:
🏖️ البحر
🏝️ اللاجون
🏊 البول`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });

    return;
}


if (intent === "telal") {

    await sock.sendMessage(user, {
        image: { url: "QR/telal.jpeg" },
        caption: `📍 QR تلال

Instapay or Vodafone Cash قبل الدخول:
800 جنيه للفرد

دفع عند الوصول:
1000 جنيه للفرد

يشمل:
🏖️ البحر
🏊 البول`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });

    return;
}

if (intent === "mountain_view") {

    await sock.sendMessage(user, {
        image: { url: "QR/mv1.jpeg" },
        caption: `📍 QR ماونتن فيو رأس الحكمة

Instapay or Vodafone Cash قبل الدخول:
700 جنيه للعربيه 🚗

دفع عند الوصول:
1000 جنيه للعربيه 🚗`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });

    return;
}


if (intent === "telal") {

    await sock.sendMessage(user, {
        image: { url: "QR/telal.jpeg" },
        caption: `📍 QR تلال

Instapay or Vodafone Cash قبل الدخول:
800 جنيه للفرد

دفع عند الوصول:
1000 جنيه للفرد

يشمل:
🏖️ البحر
🏊 البول`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });

    return;
}


if (intent === "payment") {
    await handlePayment(user, userNumber, sock);
    return;
}

if (intent === "restaurant") {
    await sendRestaurant(user, sock);
    return;
}

if (intent === "cars") {
    await sendCars(user, sock);
    return;
}


if (intent === "prices") {
    await sock.sendMessage(user, {
        text:
`💰 الأسعار تختلف حسب:

📍 المكان
📅 التاريخ
👥 عدد الأفراد

ابعت اسم الخدمة أو المكان لمعرفة السعر ❤️`
    });
    return;
}

if (intent === "jetski") {
    await sendBobos(user, sock);
    return;
}

if (intent === "yacht") {
    await sendBobos(user, sock);
    return;
}

if (intent === "party") {
    await sendParty(user, sock);
    return;
}

if (intent === "support") {

    pausedUsers[user] = true;
    savePausedUsers();

    await sock.sendMessage(
        ADMIN_NUMBER + "@s.whatsapp.net",
{
        text:
`📞 العميل يريد خدمة عملاء

👤 ${userNumber}`
    });

    await sock.sendMessage(user, {
        text:
`✅ تم تحويلك لخدمة العملاء
حد هيرد عليك قريب جدا`
    });

    return;
}

//--------beaches----------

if (intent === "karl") {
    await sendkarl(user, sock);
    return;
}



if (intent === "noya") {
    await sendnoya(user, sock);
    return;
}

// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================
// =================================================FIRST MESSAGE=======================================================
// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================

if (!userState[user]) {

    userState[user] = { step: "bot_mode" };

    await sock.sendMessage(user, {
        image: { url: "QR/WELCOME.jpg" },
    });

    await sock.sendMessage(user, {
        text:
`👋 أهلاً بيك في SahelJobss ❤️

كل الي عليك ابعت رقم 1 او 2

1️⃣ لو لسه عايز تعرف الأسعار والتفاصيل
2️⃣  لو عايز تكلم خدمة العملاء وتحجز`
    });

    return;
}



// =========================
// WAITING NOTE
// =========================

if (waitingNote[user]) {

    waitingNote[user] = false;

    await sock.sendMessage(
    ADMIN_NUMBER + "@s.whatsapp.net",
{
        text:
`📩 New Note

👤 Client:
${userNumber}

📝 Message:
${text}`
    });

    await sock.sendMessage(user, {
        text:
`✅ شكراً ليك

📩 تم استلام رسالتك وهيتم التواصل معاك في أقرب وقت`
    });

    return;
}

const state = userState[user];

// =========================
// SUPPORT MODE AT FIRST MSG
// =========================
if (state?.step === "support_mode") {
    // الرجوع للبوت
    if (clean === "1") {
        delete pausedUsers[user];
        delete paymentPausedUsers[user];
        savePausedUsers();
        savePaymentPausedUsers();
        state.step = "main_menu";
        await sendMainMenu(user, sock);
    
        return;
    }

    // القائمة الرئيسية
    if (clean === "0"){
        delete pausedUsers[user];
        delete paymentPausedUsers[user];
        savePausedUsers();
        savePaymentPausedUsers();
        userState[user] = {
            step: "main_menu"
        };
        await sendMainMenu(user, sock);

        return;
    }
    // أي رسالة تانية
    await sock.sendMessage(user, {
        text:
`1️⃣ للتحدث مع البوت
0️⃣ للقائمة الرئيسية`
    });

    return;
}




// =========================
// BOT MODE STEP
// =========================

if (state.step === "bot_mode") {

    if (clean === "1") {
        state.step = "main_menu";
        userState[user] = {step: "main_menu" };
        await sendMainMenu(user, sock);
        return;
    }

    else if (clean === "2") {

        paymentPausedUsers[user] = true;
        savePaymentPausedUsers();

        userState[user] = {
            step: "support_mode"
        };

        await sock.sendMessage(
            ADMIN_NUMBER + "@s.whatsapp.net",
{
            text:
`📞 عميل جديد طلب التحدث مع خدمة العملاء

👤 الرقم:
${userNumber}`
        });

        await sock.sendMessage(user, {
            text:
`✅ تم تحويلك لخدمة العملاء

1️⃣ للتحدث مع البوت
0️⃣ للقائمة الرئيسيه`
        });

        return;
    }

    else if (clean === "9") {
        await handlePayment(user, userNumber, sock);
        return;
    }


    return;
}


// =========================
// WELCOME MENU
// =========================

if (state.step === "welcome_menu") {

    if (
        text.includes("0") ||
        text.includes("menu")
    ) {

        state.step = "main_menu";
        await sendMainMenu(user, sock);
        return;
    }
}


// =========================
// MAIN MENU lists
// =========================

if (state.step === "main_menu") {

    // اسعار QR
    if (clean === "1") {

        state.step = "qr";

        await sock.sendMessage(user, {
            text:
`📲 اسعار QR

1️⃣ مارينا
2️⃣ مراسي
3️⃣ أمواج
4️⃣ سيشيل
5️⃣ هاسيندا باي
6️⃣ هاسيندا وايت
7️⃣ ماونتن ڤيو
8️⃣ تلال


9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ رجوع`
        });

        return;
    }

    // 
    else if (clean === "2") {
        await sendBobos(user, sock);
        return;
    }

    // حجز الشاليهات
    else if (clean === "3") {
        state.step = "beach";
        await sendchalets(user, sock);
        return;
    }

    // الفنادق
    else if (clean === "4") {
        await sendHotel(user, sock);
        return;
    }

    // المطاعم
    else if (clean === "5") {
        await sendRestaurant(user, sock);
        return;
    }

    // الحفلات
    else if (clean === "6") {
        await sendParty(user, sock);
        return;
    }

    // تأجير سيارات
    else if (clean === "7") {
    await sendcars(user, sock);
        return;
    }

    // السياسات والشروط
    else if (clean === "8") {
        await sock.sendMessage(user, {
            text:
`- في حاله طلب اي QR ، بتقابل موظف SahelJobss علي البوابه و هو بيبقا معاه ال QR بتاعك بيدخلك وتدفع الحساب بعد ما تخش، ده يضمنلك انك هتخش الاول بعدين تحاسب.

- في الشواطئ, قد يسألك الامن عن مصدر الكيو ار, فقط اخبره انه من صديق. نحن غير مسؤلين اذا قمت بالرد بغير ذلك.

- الاسعار متغيره باستمرار، السعر بيزيد مع الاجازات والمواسم والخميس والجمعه، قائمه الاسعار الي بنبعتهالك بتتحدث كل يوم.

- طرق الدفع المتاحه Instapay / VodafoneCash / تحويل بنكي. بعض الخدمات قد نقبل الدفع نقدا.

- حجز الجيتسكي في مارينا يكون بتحويل مبلغ 500 جنيه كحد ادني ويتم خصم مبلغ الحجز من اجمالي الثمن.

- اليخوت في مارينا لا تتطلب حجوزات, لكن اذا كنت قادما من خارج مارينا يتم تحويل جديه حجز 500 جنيه ويتم خصم مبلغ الحجز من اجمالي الثمن.

- نوفر حجوزات للفنادق بأرخص من المواقع المتاحه, يتم ابلاغك بنسبه الحجز التي سنتحصل عليها.

- تأجير السيارات للمصريين فقط, يتم عمل استعلام امني قبل تسليم السياره ب 24 ساعه.

- احنا في SahelJobss بتساعدك تقضي اجازه سعيده بدون اغضاب الله, اي سوء استخدام منك لخدماتنا  فنحن نبرء ذمتنا منه.


0️⃣ الرجوع للقائمه`
        });

        await sock.sendMessage(user, {
            image: { url: "QR/instructions.jpg" },
            caption: "برجاء الالتزام بالتعليمات اعلاه"
        });


        return;
    }




    // Leave Note
    else if (clean === "9") {

        await handlePayment(user, sock);
        return;
    }
//----------------

    else {
        await sendMainMenu(user, sock);
        return;
    }
}

// =========================
// QR MENU 
// =========================

if (state.step === "qr") {

    // مارينا
    if (clean === "1") {

    await sock.sendMessage(user, {
        image: { url: "QR/marina.jpg" },
        caption: `📍 QR مارينا

Instapay or Vodafone Cash قبل الدخول:
🚗 250 جنيه للعربية

دفع عند الوصول:
🚗 400 جنيه للعربية`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });
        return;
    }

    // مراسي
    else if (clean === "2") {


    await sock.sendMessage(user, {
        image: { url: "QR/Marassi/marina1.jpeg" },
        caption: `مراسي مارينا ✨:

Instapay or Vodafone Cash قبل الدخول:
1000 جنيه للعربية 🚗

دفع عند الوصول:
1400 جنيه للعربيه 🚗`
    });

    await sock.sendMessage(user, {
        image: { url: "QR/Marassi/north1.jpeg" },
        caption: `• نورث بيتش 🏖️:

Instapay or Vodafone Cash قبل الدخول:
1200 جنيه للفرد

دفع عند الوصول:
1500 جنيه للفرد

note:
لا يشمل qr البوابه الخارجيه`
    });


    await sock.sendMessage(user, {
        image: { url: "QR/Marassi/blancalagoon.jpeg" },
        caption: `• مراسي بلانكا 🏝️:

Instapay or Vodafone Cash قبل الدخول:
2500 جنيه للعربيه 🚗

دفع عند الوصول:
3000 جنيه للعربيه 🚗

note:
لا يشمل qr البوابه الخارجيه`
    });

    await sock.sendMessage(user, {
        image: { url: "QR/Marassi/marinalagoon.jpg" },
        caption: `حمامات سباحه المارينا  🏝️:

Instapay or Vodafone Cash قبل الدخول:
600 جنيه للفرد

دفع عند الوصول:
800 جنيه للفرد

note:
لا يشمل qr البوابه الخارجيه`
    });

    await sock.sendMessage(user, {
        image: { url: "QR/Marassi/waterworld.jpeg" },
        caption: ` مراسي واتر وورلد 🏝️:

تذكره لشخص بالغ:
2500 جنيه

تذكره لطفل أقصر من 120 سم:
2000 جنيه

note:
السعر يشمل qr البوابه الخارجيه
الأطفال أطول من 120 سم يتم احتسابهم بالغين`
    });    
    

    await sock.sendMessage(user, {
        image: { url: "QR/Marassi/hub.jpeg" },
        caption: `THE HUB MARASSI

Instapay or Vodafone Cash قبل الدخول:
800 جنيه للعربيه 🚗`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });

        return;
    }

    // أمواج
    else if (clean === "3") {

    await sock.sendMessage(user, {
        image: { url: "QR/amwaj1.jpeg" },
        caption: `📍 QR أمواج
        
Instapay or Vodafone Cash قبل الدخول:
900 جنيه للفرد

يشمل:
🏖️ البحر
🏝️ اللاجون
🏊 البول`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });

        return;
    }

    // سيشيل
    else if (clean === "4") {

    await sock.sendMessage(user, {
        image: { url: "QR/seashell2.jpeg" },
        caption: `📍 QR سيشيل

Instapay or Vodafone Cash قبل الدخول:
1500 جنيه للفرد

دفع عند الوصول:
1900 جنيه للفرد
يشمل:
🏖️ البحر
🏝️ اللاجون
🏊 البول`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });
        return;
    }

    // هاسيندا باي
    else if (clean === "5") {

    await sock.sendMessage(user, {
        image: { url: "QR/haceindabay1.jpeg" },
        caption: `📍 QR هاسيندا باي

Instapay or Vodafone Cash قبل الدخول:
700 جنيه للفرد

دفع عند الوصول:
900 جنيه للفرد

يشمل:
🏖️ البحر
🏝️ اللاجون
🏊 البول`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });
        return;
    }

    // هاسيندا وايت
    else if (clean === "6") {

    await sock.sendMessage(user, {
        image: { url: "QR/haceindawhite1.jpeg" },
        caption: `📍 QR هاسيندا وايت

Instapay or Vodafone Cash قبل الدخول:
1500 جنيه للفرد

دفع عند الوصول:
1900 جنيه للفرد

يشمل:
🏖️ البحر
🏝️ اللاجون
🏊 البول`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });
        return;
    }

    // ماونتن فيو
    else if (clean === "7") {

    await sock.sendMessage(user, {
        image: { url: "QR/mv1.jpeg" },
        caption: `📍 QR ماونتن فيو رأس الحكمة

Instapay or Vodafone Cash قبل الدخول:
700 جنيه للعربيه 🚗

دفع عند الوصول:
1000 جنيه للعربيه 🚗`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });

        return;
    }


    // تلال
    else if (clean === "8") {

    await sock.sendMessage(user, {
        image: { url: "QR/telal.jpeg" },
        caption: `📍 QR تلال

Instapay or Vodafone Cash قبل الدخول:
800 جنيه للفرد

دفع عند الوصول:
1000 جنيه للفرد

يشمل:
🏖️ البحر
🏊 البول`
    });

    await sock.sendMessage(user, {
        text:
`9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ القائمة الرئيسية كامله`
    });

        return;
    }

    // Payment
    else if (clean === "9") {
    await handlePayment(user, userNumber, sock);
    return;
    }

    // رجوع
    else if (clean === "0") {

        state.step = "main_menu";
        await sendMainMenu(user, sock);
        return;
    }

    else {

        await sock.sendMessage(user, {
            text:
`📲 اسعار QR

1️⃣ مارينا
2️⃣ مراسي
3️⃣ أمواج
4️⃣ سيشيل
5️⃣ هاسيندا باي
6️⃣ هاسيندا وايت
7️⃣ ماونتن ڤيو
8️⃣ تلال


9️⃣ للحجز وتحويل المحادثه لخدمة العملاء
0️⃣ رجوع`
        });

        return;
    }
}






// =========================
// BEACH MENU 
// =========================

if (state.step === "beach") {

    // KARL
    if (clean === "1") {
        await sendkarl(user, sock);
        return;
    }


    else if (clean === "2") {
        await sendnoya(user, sock);
        return;
    }

    // Payment
    else if (clean === "9") {
    await handlePayment(user, userNumber, sock);
    return;
    }

    // رجوع
    else if (clean === "0") {

        state.step = "main_menu";
        await sendMainMenu(user, sock);
        return;
    }
}
   

    });

}

startBot();