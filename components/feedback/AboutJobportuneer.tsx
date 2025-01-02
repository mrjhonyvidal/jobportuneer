import { Sparkles, Rocket, Coffee } from "lucide-react"; // Icons for visual enhancement

export default function AboutJobportuneer() {
  return (
    <section className="py-12 px-6 sm:px-12 lg:px-24 text-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Introduction Section */}
        <h2 className="text-4xl font-bold text-center mb-6">
          The Story Behind <span className="text-primary">Jobportuneer</span>
        </h2>
        <p className="text-lg leading-relaxed mb-12">
          For over 10 years, I&apos;ve been a developer, building apps and
          solving problems. But job hunting has always been a challenge for me.
          It&apos;s exhausting to keep fixing my CV, tracking applications, and
          getting ready for interviews. I often feel stuck and frustrated.
        </p>

        {/* Birth of Jobportuneer Section */}
        <h3 className="text-3xl font-semibold flex items-center mb-4">
          <Rocket className="w-6 h-6 text-primary mr-2" />
          The Birth of Jobportuneer
        </h3>
        <p className="text-lg leading-relaxed mb-12">
          That&apos;s when I got an idea, and Jobportuneer was born. It&apos;s a
          tool designed with one goal: to make your job search better. Managing
          applications, follow-ups, and deadlines can be overwhelming, but
          Jobportuneer helps you stay organized and laser-focused so you can
          stand out. This is about giving you the edge, because when you&apos;re
          looking for a job, you need to be at your best.
        </p>

        {/* How You Can Help Section */}
        <h3 className="text-3xl font-semibold flex items-center mb-4">
          <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
          How You Can Help
        </h3>
        <p className="text-lg leading-relaxed mb-6">
          Your support makes a big difference. By buying me a coffee{" "}
          <Coffee className="inline-block w-5 h-5 text-yellow-600 mx-1" />,
          you&apos;re helping me improve Jobportuneer and add features that give
          you more tools to succeed. Together, we can make this tool exactly
          what you need to take control of your job search. Let&apos;s do this!
        </p>
      </div>
    </section>
  );
}
