import { Phone, Mail, Facebook } from "lucide-react";
import Instagram from "@/components/Instagram";
import Whatsapp from "@/components/Whatsapp";
const ContactPage = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100dvh-64px)]">
      <div className="flex flex-col justify-center items-center  w-full  py-14 px-4 gap-2">
        {/* <div className=""> */}
        <h1 className="text-4xl font-bold">Contacto</h1>
        <div>
          <section className="flex gap-2 p-2 justify-between">
            <Phone /> <a href="tel:+526251276445">+52 625 127 6445</a>
          </section>
          <section className="flex gap-2 p-2 justify-between">
            <Mail />{" "}
            <a href="mailto:dayz@gmail.com?subject=DAYZ PROD CONTACTO">
              dayz@gmail.com{" "}
            </a>
          </section>
        </div>

        <section className="flex gap-4">
          <a href="https://www.instagram.com/dayz.studio/">
            <Instagram />
          </a>
          <a href="https://www.facebook.com/adrian.diazolivas">
            <Facebook />
          </a>
          <a href="https://wa.me/+526251276445">
            <Whatsapp />
          </a>
        </section>
        {/* </div> */}
      </div>
    </div>
  );
};
export default ContactPage;
