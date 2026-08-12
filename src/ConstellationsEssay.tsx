import { useEffect } from "react";
import "./ConstellationsEssay.css";

/*
THESIS: The watercolor illustration becomes the opening leaf of the essay, refusing a detached title-and-image stack.
OWN-WORLD: Warm paper, navy Iowan Old Style, muted cartographic gold, and two unframed watercolor works.
STORY: The reader moves from a child beneath a constellation into Will’s exact account of illness, recovery, human connection, and borrowed light.
FIRST VIEWPORT: The sailboat artwork spans the page while the HTML title and date rest in its open left-hand sky, clear of the boat and celestial geometry.
FORM: A continuous illustrated folio pinned by the supplied composition and manuscript; no concept seed required.
*/

const nasaSource =
  "https://science.nasa.gov/asset/hubble/ultra-deep-field-looking-out-into-space-looking-back-into-time/";

function EssayHero() {
  return (
    <header className="constellations-hero">
      <figure className="constellations-hero__art">
        <img
          src="/artwork/constellations/constellations-hero.jpg"
          alt="A child sails beneath a blue watercolor sky traced with gold constellation lines."
          width="1182"
          height="665"
          fetchPriority="high"
        />
      </figure>
      <div className="constellations-hero__heading">
        <h1 className="constellations-hero__title">
          <span>Constellations of</span>{" "}
          <span>Borrowed Light</span>
        </h1>
        <time className="constellations-hero__date" dateTime="2022-10-02">
          2022-10-02
        </time>
      </div>
    </header>
  );
}

function DeepFieldWatercolor() {
  return (
    <figure className="deep-field-watercolor">
      <img
        src="/artwork/constellations/deep-field-watercolor.png"
        alt="A watercolor deep field filled with distant galaxies and points of light."
        width="1536"
        height="1024"
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}

function CottageMemoryWatercolor() {
  return (
    <figure className="cottage-memory-watercolor">
      <img
        src="/artwork/constellations/chi-chi-cottage-memory.png"
        alt="A young child runs with a small dog along a lakeside cottage path."
        width="1536"
        height="1024"
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}

export default function ConstellationsEssay() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Constellations of Borrowed Light — William Blair";
    document.body.classList.add("constellations-route");

    return () => {
      document.title = previousTitle;
      document.body.classList.remove("constellations-route");
    };
  }, []);

  return (
    <article className="constellations-essay">
      <EssayHero />
      <div className="constellations-copy">
        <p>When I was six years old, I was such a happy kid.</p>

        <p>
          I loved playing soccer and spending time with my friends. I had many friends in my Rosedale and Whitney neighbourhoods in Ontario. I loved travelling, especially to places like Prince Edward Island and Florida. But toward the end of Grade one, around April, I began to feel seriously ill. I developed severe headaches, nausea, and a fever. Naturally, I saw several doctors, but none of them knew what was wrong. They assumed it was a virus and told me it would pass within a week or two. Each time I returned, the answer was the same: one more week. This continued for nearly two months. I missed school, stayed home, and spent most of my days resting or sleeping. Meanwhile, the headaches kept getting worse. It felt as though pressure was building inside my head, and I had no idea what was causing it.
        </p>

        <p>
          One day, everything reached a fever pitch. I felt incredibly sick, and my temperature had climbed to 105 degrees. It was time to rush to the hospital. My mom was frantic. She got me into the car, and we drove to SickKids. The doctors ordered an MRI to see whether something was wrong with my brain. After a short wait, the scan confirmed my mom’s worst fear: there was a tumour growing in my cerebellum. I remember sitting in the waiting room. A volunteer, perhaps fourteen or fifteen years old, tried to comfort my mom and me. But once the news came, there was nothing she could say that would console my mother. My first reaction was confusion, which was perhaps normal for a boy in grade school. I am not even sure I felt afraid at first. Until then, my life had been easy in so many ways. My parents were always there for me, and I felt free to go anywhere. I loved visiting the cottage by the lake in Muskoka and spending time in Westport, a small town in Eastern Ontario. Everything had felt ideal—almost perfect.
        </p>

        <p>In that waiting room, everything changed.</p>

        <p>
          For the first time, I understood that the world I had been living in was not as safe or perfect as I had believed. I was too confused to understand what it meant—that a tumour had been growing in my cerebellum. The words blurred together into one long sentence I could not make sense of. Over the next few hours, after I was taken to my hospital room, the nurses began running what felt like hundreds of tests. Slowly, the confusion gave way to fear—a frantic, overwhelming kind of fear. I wanted to be back home with my friends, going to school and doing normal, everyday things. That was what I loved. It was my whole world as a six-year-old, and although that world was small, it felt perfect. Then, in a single moment, everything changed. I had no idea what the future held. Was I going to get better? Was I going to survive?
        </p>

        <p>
          As they ran test after test, I found myself questioning everything I understood about my place in the world and what life meant. In those few days, I grew up quickly. It was the first time I realized that life was not all rainbows and butterflies. It could be frightening, uncertain, and far more difficult than I had ever imagined. I still remember those nights clearly: the nurses waking me to run more tests, the loneliness of lying awake, terrified and unable to sleep. Honestly, to my surprise, the hospital food was not all that bad. It even became something I almost looked forward to every day. What I looked forward to most, though, was seeing the other patients around my age. We were all frightened and confused, and somehow that made it easier to understand one another. About two days after I was admitted, I met my surgeon, Dr. James Drake. He explained to my parents and me that the tumour in my cerebellum was severe. Had it gone undetected for even a few more weeks, I might not have survived. We had caught it late, but there was still time to operate. He explained what the surgery would involve and the risks that came with it, particularly the possibility of problems with movement and mobility, as well as speech, hearing, and vision. I sat there quietly, taking it all in. I felt numb and did not know how to react. So much had already changed that, by then, nothing could really surprise me.
        </p>

        <p>
          On the morning of my surgery, I woke very early in the morning, connected to more machines than I could count. The nurses settled me into a hospital bed and wheeled me toward the operating wing. As I was taken into the operating room, I gave my parents a sad wave goodbye and hoped I would see them again when I woke up. My mom was crying, and I tried to be strong for her. Through it all, I felt numb, both physically and emotionally. I could not fully understand what was happening, let alone how I was supposed to feel. I remember learning the word “anesthesiologist,” which seemed impossibly long at the time. He came in smiling, asked how I was feeling, and let me choose the flavour of the gas. I chose watermelon. The mask was placed over my face, and I began to breathe in the sweet watermelon scent.
        </p>

        <p className="constellations-copy__recollection">
          The smell was wonderful, and I felt my eyes slowly close as my senses began to fade. My final thought was not about the surgery, the risks, or my health. It was about my grandmother’s dog, Chi-Chi. I was very close to her, and I wanted to hold on to something happy. I pictured us at the cottage, running together along our secret path and spending the day side by side. That was the last thing I remember before falling unconscious.
        </p>

        <CottageMemoryWatercolor />

        <p>
          Six hours later, I woke and slowly began to regain my senses. First, I moved my fingers and hands. Then I became aware of the voices around me and the steady beeping of the machines. Soon after, I heard my mom speaking with Dr. Drake. He told her that it could take several hours for me to regain full consciousness and that she should not panic if I woke up and was unable to speak, move, or hear properly. He was trying to prepare her for the possibility that something might seem wrong at first. I overheard all of this. I opened my eyes and, although I cannot remember my exact words, I said something like, “Are you talking about me?” My mom and Dr. Drake turned toward me and smiled. Dr. Drake said he had never seen anyone wake up—and begin speaking—so quickly.
        </p>

        <p>
          And just like that, the surgery was over. I remained in the hospital for another two weeks, undergoing tests each day and often being woken during the night for more. Along the way, I became friends with several other patients and genuinely enjoyed getting to know them. SickKids had a games room filled with video games and board games. I spent much of my time there playing with the other patients, my dad, or my mom. By the end of my stay, I did not want to leave. It was ironic, since being discharged is usually supposed to be the happiest moment of a hospital stay. But I had grown deeply grateful for the people around me and for everyone who had supported me.
        </p>

        <p>
          By the time I was discharged, I had lost much of my mobility. I began seeing a physiotherapist and practiced every day, walking, running, and doing strength exercises until I gradually regained my balance and movement. I was also deeply self-conscious about the large scar on the back of my head. I did not want anyone to see it. Every night before bed, my mom applied vitamin E oil to help it heal. For a long time, I was terrified of returning to the barbershop because I knew the barber would see it. I wanted to keep my scar a secret, and I have kept it private ever since because I never wanted people to see me differently. Everyone carries hidden pain, and mine was no different. The tumour and surgery became defining parts of my life, but I preferred to reveal their impact through my actions rather than by telling people what I had been through. Afterward, I faced a long period of rehabilitation. That was when I began swimming. I was terrible at first—definitely the slowest—but it was a start.
        </p>

        <p>
          I was bullied often in elementary school. Some people knew what I had been through. I had lost a great deal of weight, sometimes struggled to walk, and was also a bit of a nerd, which made me an easy target. Because I could no longer play contact sports, I also had to give up soccer, which had once meant everything to me. From that point on, I decided that I wanted to devote my life to helping others, whether through research or medicine. I wanted to be like the medical staff who had been there for me and, one day, provide that same care to other children. That was why I focused so intensely on school. Academics felt like the only path I had left and the only way to achieve that vision. Everything else—friends, sports, and the rest of life—came second. For years, that single goal became my identity. I was an unusually serious child, and everyone noticed it: my teachers, my classmates, and my parents. The change began in high school, when I started to make room for other parts of life. I became more open to friendship, sports, and interests beyond school.
        </p>

        <p>Much of that shift came from discovering another passion: swimming.</p>

        <p>
          I joined the swim team at UCC in Grade 7, but I never felt as though I belonged. I was still slow and not yet a strong swimmer, since swimming remained part of my rehabilitation. By Grade 9, however, I had become more committed to the team. I attended practices regularly, both for rehabilitation and as a way to take my mind off school. Near the end of the season, the provincial championships were approaching, but I had not qualified. Then, after one practice, my coach and mentor, Vlad, (someone who remains incredibly important to me to this day) pulled me aside. “You’re going to have the opportunity to swim on the provincial relay team,” he said.
        </p>

        <p>
          I could hardly believe him. Provincials were only two or three weeks away, and he told me I could join the team on one condition: I had to attend practice every day. I was not especially excited by the prospect, but I agreed. I committed to the training and showed up each day. At provincials, our relay placed ninth and missed the final. It was a major disappointment because we had expected to do better. For me, it was especially difficult because I had not swum well, and there was only so much progress I could make in two weeks.
        </p>

        <p>
          But something changed after that. Vlad had believed in me and given me an opportunity, and I became determined to improve over the following year. By the time the Grade 10 swim season began, I was attending every practice. I had experienced the excitement of provincials and wanted to return—not simply to compete, but to win. I wanted to prove to myself that, after everything I had been through, I could still be like everyone else. I wanted to feel normal again. I trained every day, and the work began to show. I improved significantly, earned a place on the relay team, and that year, we won the 200-metre freestyle relay at the provincial championships.
        </p>

        <p>
          The feeling was incredible. The victory meant more to me than the title itself. It proved that I could commit myself to something difficult and succeed. From that moment on, I was fully invested in swimming. That day was a turning point, one of the defining milestones of my journey. I vividly remember Vlad calling me over just before the final race. He gave me a powerful motivational talk, reminding me of all the hours I had trained and everything I had done to reach that moment. He made me feel proud of what I had already accomplished. Then he told me, with complete confidence, that we were going to win.
        </p>

        <p>
          And we did. I swam that race for Vlad, but also for myself to overcome the limits I had placed on who I believed I could be.
        </p>

        <p>
          Later that week, the other coaches called a meeting. Vlad had not been at the championships because his wife was due to give birth to their first child that same day. Even from the hospital, while waiting for his child to be born, he had called every member of the team. His attention was still on us. After our victory, we did not hear from him for several days. We assumed he would want to celebrate with the team, but he was absent from school and practice. We did not understand why. At the end of the week, the other coaches finally met with us. They looked devastated. They explained that Vlad had not been in contact because something tragic had happened: his son had been stillborn. It felt unbearably unfair. Vlad was one of the kindest people I knew. While we had been celebrating one of the greatest moments in our team’s history—a moment he had helped make possible—he had been enduring an unimaginable loss. We were devastated. I could hardly believe it. That weekend, he sent the team an email with the subject line “Tavi Merrick Reutberg.” It remains the most powerful and inspiring message I have ever read. I still keep it starred in my email, and whenever I need a pick-me-up, I read it.
        </p>

        <p>I’ll read the important part of the email here:</p>

        <blockquote>
          <p>
            “To those who don’t know and were not present yesterday after the team photo, my wife and I lost our son on Tuesday this past week. That was the day that we won that relay. We’re devastated, and we are doing our best to get through this. His name is Tavi Merrick-Rudberg. He weighed in at 8 pounds, 9 ounces, and was 56 centimetres long. He had big hands and big feet, so he was ready to swim the 200 M and would have given incredibly powerful high fives anytime after the age of two months. He was a beautiful boy. Be proud of your hard work and perseverance. You accomplished some very amazing things in the past few months.”
          </p>
        </blockquote>

        <p>
          That description of his son is still so heartbreaking to me. It also reminds me of gratitude, and not taking things for granted. We often forget about everything we have, and we focus only on the things we don’t have. That was a big thing for me while going through that surgery. It was a tough time, but I met other patients who had it even worse—a hundred times worse than me; and yet, they still smiled. They came every day, and they looked happy. And... that was inspirational.
        </p>

        <p>
          After that year, something shifted in the way I saw myself. I was happier. School was no longer the only thing in my life. Through swimming, I had found close friends, and being around them brought me a kind of happiness I had been missing. For the next two years, I went to practice every day, sometimes twice a day. I kept going not only because I had grown to love swimming, but because I wanted to see my teammates. I wanted to see Vlad, and I wanted to make everyone proud. Some of my favourite memories come from those years: racing, spending time with my coaches and friends, and sharing in everything we accomplished together.
        </p>

        <p>
          I learned that I could prove to myself what I was capable of by committing fully to something, even if my six-year-old self could never have imagined achieving it. He would be proud to know how far we have come and what we have been able to accomplish. None of it would have been possible without the serendipitous human connections I formed and sustained along the way. To me, that is exceptionally powerful. Those relationships have shaped how I understand my own potential and the kind of life I want to build from everything I have experienced.
        </p>

        <p>
          Consider the photo below; stare into it for a while. Try to imagine the gaps and space between the lights that you see. It must be incredibly difficult to imagine that with all the abundant lights depicted in this famous Deep Field photo, the most distant galaxies are about 13.2 to 13.5 billion light-years away from each other.
        </p>

        <DeepFieldWatercolor />

        <p>
          NASA describes the image as,{" "}
          <a href={nasaSource}>“looking farther out into space is also looking farther back in time.”</a>{" "}
          The patterns we recognize as constellations depend partly on our perspective as observers. The stars may have been there all along, but certain people teach us how to connect the dots. What looks like a single shape from Earth is actually made up of stars separated by enormous distances, and the connection exists partly because of where we stand and how we learn to see it. There is also something strange about the time contained in that image. Because light takes time to travel, we do not see a distant star exactly as it is now, as we see the light it sent toward us years ago.
        </p>

        <p>
          In the same way, certain people and experiences have helped me understand parts of my life that I could not fully recognize when they first happened. I like to think of the ways memories work similarly in this sense. A person changes your life in particular moments, but the meaning of those moments can continue travelling toward you long afterward. You understand them differently as you grow older, even though the moments themselves have already passed.
        </p>

        <p>
          That is how I have come to understand the relationships and experiences that have shaped me. They did not give me an entirely new set of stars. Instead, they gave me a new angle from which the pattern gradually became visible. I am grateful for everything I have and everything I have made it through. I want to continue giving back to others and pursuing the things my six-year-old self would have thought impossible.
        </p>

        <p>
          I want the life I build from here to reflect the light I have received from so many others—and, in turn, to cast some of that light back into the constellations.
        </p>

        <p className="constellations-copy__dedication">For M.</p>
      </div>
    </article>
  );
}
