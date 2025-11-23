import WindowControlls from "../components/WindowControlls";
import { socials } from "../constants";
import WindowWrapper from "../hoc/WindowWrapper";

const ContactWindow = () => {
  return (
    <>
      <div id="window-header">
        <WindowControlls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="p-5 space-y-5">
        <img
          src="/images/adrian.jpg"
          alt="Oahid"
          className="w-20 rounded-full"
        />

        <h3>Let's connect</h3>

        <p>Got an Idea? A bug to squash? Or just wanna talk tech? Hit me up!</p>
        <p>oahidzihad1@gmail.com</p>

        <ul>
          {socials.map((social) => (
            <li key={social.id} style={{ backgroundColor: social.bg }}>
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                title={social.text}
              >
                <img src={social.icon} alt={social.text} className="size-5" />
                <p>{social.text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const Contact = WindowWrapper(ContactWindow, "contact");
export default Contact;
