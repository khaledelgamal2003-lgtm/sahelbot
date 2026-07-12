let pairingSent = false;

sock.ev.on("connection.update", async (update) => {
    const { connection } = update;

    if (connection === "open") {
        console.log("✅ Bot Connected");
    }

    // اطلب pairing code مرة واحدة فقط لما يكون لسه مش مسجل
    if (!pairingSent && !sock.authState.creds.registered) {
        pairingSent = true;

        try {
            const phoneNumber = "201055855696"; // رقمك بدون +

            const code = await sock.requestPairingCode(phoneNumber);

            console.log("🔑 Pairing Code:");
            console.log(code);

        } catch (err) {
            console.log("❌ Pairing Error:", err.message);
        }
    }
});











    
    // تخزين حالة كل مستخدم
    const userState = {};

    // Anti spam
    const userLock = {};

    // استقبال الرسائل
    sock.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0];

        if (!msg.message) return;

        const user = msg.key.remoteJid;

//--------------------------------------------


console.log(user);

// تجاهل الجروبات
if (user.endsWith("@g.us")) return;

// استخراج الرقم
const userNumber = user.replace("@lid", "");

console.log("USER:", userNumber);




// =========================
// BLOCKED NUMBERS
// =========================

const blockedNumbers = [
  //  "30228197957871"
];

// منع الأرقام
if (blockedNumbers.includes(userNumber)) {

    console.log("BLOCKED USER:", userNumber);

    return;
}


        // قراءة النص
        let text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        text = text.trim();

        // استخراج الأرقام فقط
        const clean = text.replace(/[^0-9]/g, "");

        // منع السبام
        if (userLock[user]) return;

        userLock[user] = true;

        setTimeout(() => {
            userLock[user] = false;
        }, 500);

        // =========================
        // أول رسالة
        // =========================

        if (!userState[user]) {

            userState[user] = {
                step: "language"
            };

            await sock.sendMessage(user, {
                text:
`👋 ازيك, معاك بولي من SahelJobss
انا هنا علشان اساعدك تعرف كل حاجه
🥰كل الي عليك ترد عليا بارقام انجليزيه زي 1 و 2 و 3 وسيب الباقي عليا

Please choose your language:
1️⃣ عربي
2️⃣ English`
            });

            return;
        }

        const state = userState[user];

        // =========================
        // LANGUAGE STEP
        // =========================

        if (state.step === "language") {

            // عربي
            if (clean === "1") {

                state.lang = "ar";
                state.step = "main_ar";

                await sock.sendMessage(user, {
                    text:
`📋 القائمة الرئيسية

1️⃣ اسعار QR
2️⃣ الجيتسكي واليخوت
3️⃣ الفنادق
4️⃣ المطاعم
5️⃣ إيجار السيارات
6️⃣ توصيل من والي مطار العلمين`
                });

                return;
            }

            // English
            else if (clean === "2") {

                state.lang = "en";
                state.step = "main_en";

                await sock.sendMessage(user, {
                    text:
`📋 Main Menu

1️⃣ QR Prices
2️⃣ Jetski & Yachts
3️⃣ Chalets & Villas
4️⃣ Hotels reservations
5️⃣ Restaurants
6️⃣ Car rentals
7️⃣ Airport pick up and drop off
8️⃣ Terms and Policies`
                });

                return;
            }

            else {

                await sock.sendMessage(user, {
                    text: "❗ Please choose 1 or 2 only"
                });

                return;
            }
        }

        // =========================
        // MAIN MENU ENGLISH
        // =========================

        if (state.step === "main_en") {

            // QR Prices
            if (clean === "1") {

                state.step = "qr_en";

                await sock.sendMessage(user, {
                    text:
`📲 QR Prices

1️⃣ Marina
2️⃣ Marassi
3️⃣ Amwaj
4️⃣ Seashell
5️⃣ Hacienda-Bay
6️⃣ Hacinda-White
7️⃣ Mountain view ras elhekma
0️⃣ Back`
                });

                return;
            }

            // Jetski
            else if (clean === "2") {

                state.step = "jetski_en";

                await sock.sendMessage(user, {
                    text:
`🛥️ Jetski & Yachts

1️⃣ Jetski at Marina
2️⃣ Yacht at Marina
3️⃣ Jetski at Marassi
4️⃣ Yacht at Marassi
0️⃣ Back`
                });

                return;
            }
//-------------------
            // Chalets & Villas
            else if (clean === "3") {
                await sock.sendMessage(user, {
                    text:
`For Renting a Chalet or Villa
Please wait till customer service contact you.`
                });

                return;
            }
//-----------------------
            // Holtels
            else if (clean === "4") {
                await sock.sendMessage(user, {
                    text:
`📲 Hotels Reservation
Coming Soon...

0️⃣ Back`
                });
                return;
            }

            // Restaurants
            else if (clean === "5") {
                await sock.sendMessage(user, {
                    text:
`📲 Resturants Reservation
Coming Soon...

0️⃣ Back`
                });
                return;
            }

            // Car rentals
            else if (clean === "6") {
                await sock.sendMessage(user, {
                    text:
`📲 Car Rentals
Coming Soon...

0️⃣ Back`
                });
                return;
            }

            // Airpot
            else if (clean === "7") {
                await sock.sendMessage(user, {
                    text:
`📲 Airport Cars
Coming Soon...

0️⃣ Back`
                });
                return;
            }

            // Terms and Policies
            else if (clean === "8") {
                await sock.sendMessage(user, {
                    text:
`Terms & Polices

- If you require a QR code, a SahelJobss representative will meet you at the gate. They will have your QR code and will allow you entry. You will pay after entering. This ensures you can enter first and then pay.

- At the beaches, security may ask about the source of your QR code. Simply tell them it's from a friend. We are not responsible if you provide any other information.

- Prices are subject to change. Prices increase during holidays, peak seasons, and on Thursdays and Fridays. The price list we send you is updated daily.

- Available payment methods: Instapay / VodafoneCash / Bank Transfer. For some services, we may accept cash.

- Jet ski bookings at Marina require a minimum deposit of 500 EGP, which will be deducted from the total price.

- Yachts at Marina do not require bookings. However, if you are coming from outside Marina, a 500 EGP deposit is required, which will be deducted from the total price.

- We offer hotel bookings at prices lower than other available websites. You will be informed of the percentage of bookings we will receive.

- Car rentals are for Egyptians only. A security check is conducted 24 hours before the car is returned.

- SahelJobss helps you have a happy vacation without displeasing God. We are not responsible for any misuse of our services.

0️⃣ Back`
                });
                return;
            }            

            //Back
            else {

                await sock.sendMessage(user, {
                    text:
`📋 Main Menu

1️⃣ QR Prices
2️⃣ Jetski & Yachts
3️⃣ Chalets & Villas
4️⃣ Hotels reservations
5️⃣ Restaurants
6️⃣ Car rentals
7️⃣ Airport pick up and drop off
8️⃣ Terms and Policies`

                });

                return;
            }
        }

        // =========================
        // QR MENU
        // =========================

        if (state.step === "qr_en") {

            // Marina
            if (clean === "1") {

                await sock.sendMessage(user, {
                    text: "📍 Marina QR Price:300 EGP per car"
                });

                await sock.sendMessage(user, {
                    text: "0️⃣ Main Menu"
                });

                return;
            }

            // Marassi
            else if (clean === "2") {

                await sock.sendMessage(user, {
                    text:
`📍 Marassi Prices:

• Marassi Marina:
700 EGP per car

• Marassi Blanca Lagoon:
2500 EGP per car

• Marassi North Beach:
1000 EGP per person`
                });

                await sock.sendMessage(user, {
                    text: "0️⃣ Main Menu"
                });
                return;
            }

            // Amwaj
            else if (clean === "3") {

                await sock.sendMessage(user, {
                    text:
`📍 Amwaj QR Price:

600 EGP per person
Includes beach & lagoon access`
                });
                await sock.sendMessage(user, {
                    text: "0️⃣ Main Menu"
                });
                return;
            }

            // Seashell
            else if (clean === "4") {

                await sock.sendMessage(user, {
                    text:
`📍 Seashell QR Price:

1500 EGP per person
Includes beach & lagoon access`
                });
                await sock.sendMessage(user, {
                    text: "0️⃣ Main Menu"
                });
                return;
            }
            // Hacienda-Bay
            else if (clean === "5") {

                await sock.sendMessage(user, {
                    text:
`📍 Hacienda-Bay QR Price:

800 EGP per person
Includes beach & lagoon access`
                });
                await sock.sendMessage(user, {
                    text: "0️⃣ Main Menu"
                });
                return;
            }
            // Hacinda-White
            else if (clean === "6") {

                await sock.sendMessage(user, {
                    text:
`📍 Hacinda-White QR Price:

900 EGP per person
Includes beach & lagoon access`
                });
                await sock.sendMessage(user, {
                    text: "0️⃣ Main Menu"
                });
                return;
            }
            // Mountain view ras elhekma
            else if (clean === "7") {

                await sock.sendMessage(user, {
                    text:
`📍 Mountain view ras elhekma QR
NOT AVAILABLE AT THE MOMENT`
                });
                await sock.sendMessage(user, {
                    text: "0️⃣ Main Menu"
                });
                return;
            }
            // Back
            else if (clean === "0") {

                state.step = "main_en";

                await sock.sendMessage(user, {
                    text:
`📋 Main Menu

1️⃣ QR Prices
2️⃣ Jetski & Yachts
3️⃣ Hotels reservations
4️⃣ Restaurants
5️⃣ Car rentals
6️⃣ Airport pick up and drop off
7️⃣ Terms and Policies`
                });

                return;
            }

            else {

                await sock.sendMessage(user, {
                    text:
`📲 QR Prices

1️⃣ Marina
2️⃣ Marassi
3️⃣ Amwaj
4️⃣ Seashell
5️⃣ Hacienda-Bay
6️⃣ Hacinda-White
7️⃣ Mountain view ras elhekma
0️⃣ Back`
                });

                return;
            }
        }

        // =========================
        // JETSKI MENU
        // =========================

        if (state.step === "jetski_en") {

            // Jetski Marina
            if (clean === "1") {

                await sock.sendMessage(user, {
                    text: `15 min = 1500 EGP
30 min = 2500 EGP
60 min = 5000 EGP

Price includes marina QR entry`

                });
                await sock.sendMessage(user, {
                    text: "0️⃣ Main Menu"
                });

                return;
            }

            // Yacht Marina
            else if (clean === "2") {

                await sock.sendMessage(user, {
                    text: "🛥️ Yacht service available soon"
                });
                await sock.sendMessage(user, {
                    text: "0️⃣ Main Menu"
                });

                return;
            }
            // Jetski Marassi
            else if (clean === "3") {

                await sock.sendMessage(user, {
                    text:
`🛥️ Jetski Marassi

💰 10,000 EGP / hour

Includes Safi Beach access for the whole day`
                });
                await sock.sendMessage(user, {
                    text:
`0️⃣ Main Menu`
                });
                return;
            }
            // Yacht Marassi
            else if (clean === "4") {

                await sock.sendMessage(user, {
                    text: "🛥️ Yacht service available soon"
                });
                await sock.sendMessage(user, {
                    text: "0️⃣ Main Menu"
                });

                return;
            }
            // Back
            else if (clean === "0") {

                state.step = "main_en";

                await sock.sendMessage(user, {
                    text:
`📋 Main Menu

1️⃣ QR Prices
2️⃣ Jetski & Yachts
3️⃣ Hotels reservations
4️⃣ Restaurants
5️⃣ Car rentals
6️⃣ Airport pick up and drop off
7️⃣ Terms and Policies`
                });

                return;
            }

            else {

                await sock.sendMessage(user, {
                    text:
`🛥️ Jetski & Yachts

1️⃣ Jetski at Marina
2️⃣ Yacht at Marina
3️⃣ Jetski at Marassi
4️⃣ Yacht at Marassi
0️⃣ Back`
                });

                return;
            }
        }






// =========================
// MAIN MENU ARABIC
// =========================

if (state.step === "main_ar") {

    // اسعار QR
    if (clean === "1") {

        state.step = "qr_ar";

        await sock.sendMessage(user, {
            text:
`📲 اسعار QR

1️⃣ مارينا
2️⃣ مراسي
3️⃣ أمواج
4️⃣ سيشيل
5️⃣ هاسيندا باي
6️⃣ هاسيندا وايت
7️⃣ ماونتن ڤيو رأس الحكمة
0️⃣ رجوع`
        });

        return;
    }

    // جيتسكي ويخوت
    else if (clean === "2") {

        state.step = "jetski_ar";

        await sock.sendMessage(user, {
            text:
`🛥️ الجيتسكي واليخوت

1️⃣ جيتسكي مارينا
2️⃣ يخت مارينا
3️⃣ جيتسكي مراسي
4️⃣ يخت مراسي
0️⃣ رجوع`
        });

        return;
    }

    // الشاليهات والفيلات
    else if (clean === "3") {

        await sock.sendMessage(user, {
            text:
`🏡 لحجز شاليه أو فيلا

برجاء الانتظار حتي يتم التواصل معك من خدمة العملاء`
        });
        await sock.sendMessage(user, {
            text: "0️⃣ القائمه الرئيسيه"
        });
        return;
    }

    // الفنادق
    else if (clean === "4") {
        await sock.sendMessage(user, {
            text:
`🏨 حجز الفنادق

قريباً...

0️⃣ رجوع`
        });

        return;
    }

    // المطاعم
    else if (clean === "5") {
        await sock.sendMessage(user, {
            text:
`🍽️ حجز المطاعم

قريباً...

0️⃣ رجوع`
        });

        return;
    }

    // تأجير سيارات
    else if (clean === "6") {
        await sock.sendMessage(user, {
            text:
`🚗 تأجير السيارات

قريباً...

0️⃣ رجوع`
        });

        return;
    }

    // المطار
    else if (clean === "7") {
        await sock.sendMessage(user, {
            text:
`✈️ توصيل من وإلي المطار

قريباً...

0️⃣ رجوع`
        });

        return;
    }
//---------------
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

        return;
    }
//----------------

    else {

        await sock.sendMessage(user, {
            text:
`📋 القائمة الرئيسية

1️⃣ اسعار QR
2️⃣ الجيتسكي واليخوت
3️⃣ الشاليهات والفيلات
4️⃣ الفنادق
5️⃣ المطاعم
6️⃣ إيجار السيارات
7️⃣ توصيل من والي مطار العلمين
8️⃣ السياسات والشروط`
        });

        return;
    }
}

// =========================
// QR MENU ARABIC
// =========================

if (state.step === "qr_ar") {

    // مارينا
    if (clean === "1") {

        await sock.sendMessage(user, {
            text: "📍 سعر QR مارينا: 300 جنيه للعربية"
        });

        await sock.sendMessage(user, {
            text: "0️⃣ القائمه الرئيسيه"
        });

        return;
    }

    // مراسي
    else if (clean === "2") {

        await sock.sendMessage(user, {
            text:
`📍 اسعار مراسي:

• مراسي مارينا:
700 جنيه للعربية

• مراسي بلانكا لاجون:
2500 جنيه للعربية

• مراسي نورث بيتش:
1000 جنيه للفرد`
        });

        await sock.sendMessage(user, {
            text: "0️⃣ القائمه الرئيسيه"
        });

        return;
    }

    // أمواج
    else if (clean === "3") {

        await sock.sendMessage(user, {
            text:
`📍 سعر QR أمواج:

600 جنيه للفرد

يشمل دخول البحر واللاجون`
        });

        await sock.sendMessage(user, {
            text: "0️⃣ القائمه الرئيسيه"
        });

        return;
    }

    // سيشيل
    else if (clean === "4") {

        await sock.sendMessage(user, {
            text:
`📍 سعر QR سيشيل:

1500 جنيه للفرد

يشمل دخول البحر واللاجون`
        });

        await sock.sendMessage(user, {
            text: "0️⃣ القائمه الرئيسيه"
        });

        return;
    }

    // هاسيندا باي
    else if (clean === "5") {

        await sock.sendMessage(user, {
            text:
`📍 سعر QR هاسيندا باي:

800 جنيه للفرد

يشمل دخول البحر واللاجون`
        });

        await sock.sendMessage(user, {
            text: "0️⃣ القائمه الرئيسيه"
        });

        return;
    }

    // هاسيندا وايت
    else if (clean === "6") {

        await sock.sendMessage(user, {
            text:
`📍 سعر QR هاسيندا وايت:

900 جنيه للفرد

يشمل دخول البحر واللاجون`
        });

        await sock.sendMessage(user, {
            text: "0️⃣ القائمه الرئيسيه"
        });

        return;
    }

    // ماونتن فيو
    else if (clean === "7") {

        await sock.sendMessage(user, {
            text:
`📍 ماونتن ڤيو رأس الحكمة

غير متاح حالياً`
        });

        await sock.sendMessage(user, {
            text: "0️⃣ القائمه الرئيسيه"
        });

        return;
    }

    // رجوع
    else if (clean === "0") {

        state.step = "main_ar";

        await sock.sendMessage(user, {
            text:
`📋 القائمة الرئيسية

1️⃣ اسعار QR
2️⃣ الجيتسكي واليخوت
3️⃣ الشاليهات والفيلات
4️⃣ الفنادق
5️⃣ المطاعم
6️⃣ إيجار السيارات
7️⃣ توصيل من والي مطار العلمين
8️⃣ السياسات والشروط`
        });

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
7️⃣ ماونتن ڤيو رأس الحكمة
0️⃣ رجوع`
        });

        return;
    }
}

// =========================
// JETSKI MENU ARABIC
// =========================

if (state.step === "jetski_ar") {

    // جيتسكي مارينا
    if (clean === "1") {

        await sock.sendMessage(user, {
            text:
`15 دقيقة = 1500 جنيه
30 دقيقة = 2500 جنيه
60 دقيقة = 5000 جنيه

السعر يشمل دخول مارينا`
        });

        await sock.sendMessage(user, {
            text: "0️⃣ القائمه الرئيسيه"
        });

        return;
    }

    // يخت مارينا
    else if (clean === "2") {

        await sock.sendMessage(user, {
            text: "🛥️ خدمة اليخوت قريباً"
        });

        await sock.sendMessage(user, {
            text: "0️⃣ القائمه الرئيسيه"
        });

        return;
    }

    // جيتسكي مراسي
    else if (clean === "3") {

        await sock.sendMessage(user, {
            text:
`🛥️ جيتسكي مراسي في صافي بيتش

💰 10000 جنيه للساعة

يشمل دخول صافي بيتش طوال اليوم`
        });

        await sock.sendMessage(user, {
            text: "0️⃣ القائمه الرئيسيه"
        });

        return;
    }

    // يخت مراسي
    else if (clean === "4") {

        await sock.sendMessage(user, {
            text: "🛥️ خدمة اليخوت قريباً"
        });

        await sock.sendMessage(user, {
            text: "0️⃣ القائمه الرئيسيه"
        });

        return;
    }

    // رجوع
    else if (clean === "0") {

        state.step = "main_ar";

        await sock.sendMessage(user, {
            text:
`📋 القائمة الرئيسية

1️⃣ اسعار QR
2️⃣ الجيتسكي واليخوت
3️⃣ الشاليهات والفيلات
4️⃣ الفنادق
5️⃣ المطاعم
6️⃣ إيجار السيارات
7️⃣ توصيل من والي مطار العلمين
8️⃣ السياسات والشروط`
        });

        return;
    }

    else {

        await sock.sendMessage(user, {
            text:
`🛥️ الجيتسكي واليخوت

1️⃣ جيتسكي مارينا
2️⃣ يخت مارينا
3️⃣ جيتسكي مراسي
4️⃣ يخت مراسي
0️⃣ رجوع`
        });

        return;
    }
}
   

//send no






    });



startBot();
