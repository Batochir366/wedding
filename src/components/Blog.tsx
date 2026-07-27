import { posts, sectionTitles, ui } from '../data/site'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'

export default function Blog() {
  return (
    <section id="blog" className="pt-20 pb-[60px] md:pt-[90px] lg:pt-[120px]">
      <div className="mx-auto max-w-[1320px] px-4">
        <SectionTitle>{sectionTitles.blog}</SectionTitle>

        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.title} delay={index * 120}>
              <article className="group mb-[30px]">
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full transition-all duration-300 group-hover:scale-125 group-hover:grayscale"
                  />
                </div>

                <div className="pt-5">
                  <ul className="mb-[15px] flex text-[15px] text-primary-soft">
                    <li className="relative pr-[30px] after:absolute after:top-1/2 after:right-2.5 after:size-1.5 after:-translate-y-1/2 after:rounded-full after:bg-primary-soft after:content-['']">
                      {ui.by}{' '}
                      <a
                        href="#"
                        className="text-primary-soft transition-colors hover:text-primary"
                      >
                        {post.author}
                      </a>
                    </li>
                    <li>{post.date}</li>
                  </ul>
                  <h2 className="mt-2.5 mb-5 font-heading text-[25px] leading-9 lg:text-[30px]">
                    <a href="#" className="text-ink transition-colors hover:text-primary">
                      {post.title}
                    </a>
                  </h2>
                  <p className="text-[17px] text-text">{post.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
