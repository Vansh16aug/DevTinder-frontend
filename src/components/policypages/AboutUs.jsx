const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About StackBuddy</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg">
          At StackBuddy, we're on a mission to empower developers worldwide. We
          believe in the power of collaboration, continuous learning, and
          building a supportive community where coders of all levels can thrive.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Collaborative Coding</h3>
              <p>
                Real-time pair programming and code sharing features to boost
                productivity and learning.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Community Support</h3>
              <p>
                A vibrant community of developers ready to help, share
                knowledge, and grow together.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Learning Resources</h3>
              <p>
                Curated tutorials, workshops, and coding challenges to sharpen
                your skills.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Career Growth</h3>
              <p>
                Job boards, mentorship programs, and networking opportunities to
                advance your career.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Meet Our Developer</h2>
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure className="p-4">
            <img
              src="/placeholder.svg?height=100&width=100"
              alt="Vansh"
              className="rounded-full w-24 h-24 object-cover"
            />
          </figure>
          <div className="card-body">
            <h3 className="card-title">Vansh</h3>
            <p className="text-lg">Full Stack Developer</p>
            <p>
              Vansh is the brilliant mind behind StackBuddy. With his passion
              for coding and community building, he's created a platform that's
              revolutionizing how developers collaborate and learn.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
