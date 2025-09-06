import React from 'react';
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function Sec1Part1() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/blog-single";
  const OVERLAY_KEY = "sec1Part1";
  const { node: sec1Part1Overlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  return (
    <section className="ftco-section ftco-degree-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 ftco-animate">
            <p>
              <img src={images[0]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_1.jpg"} alt="" className="img-fluid" />
            </p>
            <h2 className="mb-3">{text[0]?.value ?? "It is a long established fact a reader be distracted"}</h2>
            <p>{text[1]?.value ?? "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eius mollitia suscipit, quisquam doloremque distinctio perferendis et doloribus unde architecto optio laboriosam porro adipisci sapiente officiis nemo accusamus ad praesentium? Esse minima nisi et. Dolore perferendis, enim praesentium omnis, iste doloremque quia officia optio deserunt molestiae voluptates soluta architecto tempora."}</p>
            <p>{text[2]?.value ?? "Molestiae cupiditate inventore animi, maxime sapiente optio, illo est nemo veritatis repellat sunt doloribus nesciunt! Minima laborum magni reiciendis qui voluptate quisquam voluptatem soluta illo eum ullam incidunt rem assumenda eveniet eaque sequi deleniti tenetur dolore amet fugit perspiciatis ipsa, odit. Nesciunt dolor minima esse vero ut ea, repudiandae suscipit!"}</p>
            <h2 className="mb-3 mt-5">{text[3]?.value ?? "#2. Creative WordPress Themes"}</h2>
            <p>{text[4]?.value ?? "Temporibus ad error suscipit exercitationem hic molestiae totam obcaecati rerum, eius aut, in. Exercitationem atque quidem tempora maiores ex architecto voluptatum aut officia doloremque. Error dolore voluptas, omnis molestias odio dignissimos culpa ex earum nisi consequatur quos odit quasi repellat qui officiis reiciendis incidunt hic non? Debitis commodi aut, adipisci."}</p>
            <p>
              <img src={images[1]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_2.jpg"} alt="" className="img-fluid" />
            </p>
            <p>{text[5]?.value ?? "Quisquam esse aliquam fuga distinctio, quidem delectus veritatis reiciendis. Nihil explicabo quod, est eos ipsum. Unde aut non tenetur tempore, nisi culpa voluptate maiores officiis quis vel ab consectetur suscipit veritatis nulla quos quia aspernatur perferendis, libero sint. Error, velit, porro. Deserunt minus, quibusdam iste enim veniam, modi rem maiores."}</p>
            <p>{text[6]?.value ?? "Odit voluptatibus, eveniet vel nihil cum ullam dolores laborum, quo velit commodi rerum eum quidem pariatur! Quia fuga iste tenetur, ipsa vel nisi in dolorum consequatur, veritatis porro explicabo soluta commodi libero voluptatem similique id quidem? Blanditiis voluptates aperiam non magni. Reprehenderit nobis odit inventore, quia laboriosam harum excepturi ea."}</p>
            <p>{text[7]?.value ?? "Adipisci vero culpa, eius nobis soluta. Dolore, maxime ullam ipsam quidem, dolor distinctio similique asperiores voluptas enim, exercitationem ratione aut adipisci modi quod quibusdam iusto, voluptates beatae iure nemo itaque laborum. Consequuntur et pariatur totam fuga eligendi vero dolorum provident. Voluptatibus, veritatis. Beatae numquam nam ab voluptatibus culpa, tenetur recusandae!"}</p>
            <p>{text[8]?.value ?? "Voluptas dolores dignissimos dolorum temporibus, autem aliquam ducimus at officia adipisci quasi nemo a perspiciatis provident magni laboriosam repudiandae iure iusto commodi debitis est blanditiis alias laborum sint dolore. Dolores, iure, reprehenderit. Error provident, pariatur cupiditate soluta doloremque aut ratione. Harum voluptates mollitia illo minus praesentium, rerum ipsa debitis, inventore?"}</p>
            <div className="tag-widget post-tag-container mb-5 mt-5">
              <div className="tagcloud">
                <a href={links[0]?.href ?? "#"} className="tag-cloud-link">{links[0]?.text ?? "Life"}</a>
                <a href={links[1]?.href ?? "#"} className="tag-cloud-link">{links[1]?.text ?? "Sport"}</a>
                <a href={links[2]?.href ?? "#"} className="tag-cloud-link">{links[2]?.text ?? "Tech"}</a>
                <a href={links[3]?.href ?? "#"} className="tag-cloud-link">{links[3]?.text ?? "Travel"}</a>
              </div>
            </div>
            <div className="about-author d-flex p-4 bg-light">
              <div className="bio mr-5">
                <img src={images[2]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_1.jpg"} alt="Image placeholder" className="img-fluid mb-4" />
              </div>
              <div className="desc">
                <h3>{text[9]?.value ?? "George Washington"}</h3>
                <p>{text[10]?.value ?? "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut, sunt placeat nam vero culpa sapiente consectetur similique, inventore eos fugit cupiditate numquam!"}</p>
              </div>
            </div>
            <div className="pt-5 mt-5">
              <h3 className="mb-5">{text[11]?.value ?? "6 Comments"}</h3>
              <ul className="comment-list">
                <li className="comment">
                  <div className="vcard bio">
                    <img src={images[2]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_1.jpg"} alt="Image placeholder" />
                  </div>
                  <div className="comment-body">
                    <h3>{text[12]?.value ?? "John Doe"}</h3>
                    <div className="meta">{text[13]?.value ?? "June 14, 2020 at 10:05pm"}</div>
                    <p>{text[14]?.value ?? "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?"}</p>
                    <p><a href={links[4]?.href ?? "#"} className="reply">{links[4]?.text ?? "Reply"}</a></p>
                  </div>
                </li>
                <li className="comment">
                  <div className="vcard bio">
                    <img src={images[2]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_1.jpg"} alt="Image placeholder" />
                  </div>
                  <div className="comment-body">
                    <h3>{text[12]?.value ?? "John Doe"}</h3>
                    <div className="meta">{text[13]?.value ?? "June 14, 2020 at 10:05pm"}</div>
                    <p>{text[14]?.value ?? "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?"}</p>
                    <p><a href={links[4]?.href ?? "#"} className="reply">{links[4]?.text ?? "Reply"}</a></p>
                  </div>
                  <ul className="children">
                    <li className="comment">
                      <div className="vcard bio">
                        <img src={images[2]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_1.jpg"} alt="Image placeholder" />
                      </div>
                      <div className="comment-body">
                        <h3>{text[12]?.value ?? "John Doe"}</h3>
                        <div className="meta">{text[13]?.value ?? "June 14, 2020 at 10:05pm"}</div>
                        <p>{text[14]?.value ?? "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?"}</p>
                        <p><a href={links[4]?.href ?? "#"} className="reply">{links[4]?.text ?? "Reply"}</a></p>
                      </div>
                      <ul className="children">
                        <li className="comment">
                          <div className="vcard bio">
                            <img src={images[2]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_1.jpg"} alt="Image placeholder" />
                          </div>
                          <div className="comment-body">
                            <h3>{text[12]?.value ?? "John Doe"}</h3>
                            <div className="meta">{text[13]?.value ?? "June 14, 2020 at 10:05pm"}</div>
                            <p>{text[14]?.value ?? "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?"}</p>
                            <p><a href={links[4]?.href ?? "#"} className="reply">{links[4]?.text ?? "Reply"}</a></p>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="comment">
                  <div className="vcard bio">
                    <img src={images[2]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_1.jpg"} alt="Image placeholder" />
                  </div>
                  <div className="comment-body">
                    <h3>{text[12]?.value ?? "John Doe"}</h3>
                    <div className="meta">{text[13]?.value ?? "June 14, 2020 at 10:05pm"}</div>
                    <p>{text[14]?.value ?? "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?"}</p>
                    <p><a href={links[4]?.href ?? "#"} className="reply">{links[4]?.text ?? "Reply"}</a></p>
                  </div>
                </li>
              </ul>
              {/* END comment-list */}
              <div className="comment-form-wrap pt-5">
                <h3 className="mb-5">{text[16]?.value ?? "Leave a comment"}</h3>
                <form action="#" className="p-5 bg-light">
                  <div className="form-group">
                    <label htmlFor="name">{text[17]?.value ?? "Name *"}</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{text[18]?.value ?? "Email *"}</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="website">{text[19]?.value ?? "Website"}</label>
                    <input type="url" className="form-control" id="website" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">{text[20]?.value ?? "Message"}</label>
                    <textarea id="message" cols={30} rows={10} className="form-control"></textarea>
                  </div>
                  <div className="form-group">
                    <input type="submit" value="Post Comment" className="btn py-3 px-4 btn-primary" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* .col-md-8 */}
          <div className="col-lg-4 sidebar pl-lg-5 ftco-animate">
            <div className="sidebar-box">
              <form action="#" className="search-form">
                <div className="form-group">
                  <span className="fa fa-search"></span>
                  <input type="text" className="form-control" placeholder="Type a keyword and hit enter" />
                </div>
              </form>
            </div>
            <div className="sidebar-box ftco-animate">
              <div className="categories">
                <h3>{text[22]?.value ?? "Services"}</h3>
                <li><a href={links[5]?.href ?? "#"}>{links[5]?.text ?? "House Cleaning"} <span className="fa fa-chevron-right"></span></a></li>
                <li><a href={links[6]?.href ?? "#"}>{links[6]?.text ?? "Roof Cleaning"} <span className="fa fa-chevron-right"></span></a></li>
                <li><a href={links[7]?.href ?? "#"}>{links[7]?.text ?? "Driveway Cleaning"} <span className="fa fa-chevron-right"></span></a></li>
                <li><a href={links[8]?.href ?? "#"}>{links[8]?.text ?? "Gutter Cleaning"} <span className="fa fa-chevron-right"></span></a></li>
                <li><a href={links[9]?.href ?? "#"}>{links[9]?.text ?? "Patio Cleaning"} <span className="fa fa-chevron-right"></span></a></li>
                <li><a href={links[10]?.href ?? "#"}>{links[10]?.text ?? "Building Cleaning"} <span className="fa fa-chevron-right"></span></a></li>
                <li><a href={links[11]?.href ?? "#"}>{links[11]?.text ?? "Concrete Cleaning"} <span className="fa fa-chevron-right"></span></a></li>
                <li><a href={links[12]?.href ?? "#"}>{links[12]?.text ?? "Sidewalk Cleaning"} <span className="fa fa-chevron-right"></span></a></li>
              </div>
            </div>
            <div className="sidebar-box ftco-animate">
              <h3>{text[31]?.value ?? "Recent Blog"}</h3>
              <div className="block-21 mb-4 d-flex">
                <a className="blog-img mr-4" style={{ backgroundImage: `url(${images[3]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_1.jpg"})` }}></a>
                <div className="text">
                  <h3 className="heading"><a href={links[13]?.href ?? "#"}>{links[13]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}</a></h3>
                  <div className="meta">
                    <div><a href={links[14]?.href ?? "#"}><span className="icon-calendar"></span> {links[14]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[15]?.href ?? "#"}><span className="icon-person"></span> {links[15]?.text ?? "Admin"}</a></div>
                    <div><a href={links[16]?.href ?? "#"}><span className="icon-chat"></span> {links[16]?.text ?? "19"}</a></div>
                  </div>
                </div>
              </div>
              <div className="block-21 mb-4 d-flex">
                <a className="blog-img mr-4" style={{ backgroundImage: `url(${images[4]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_2.jpg"})` }}></a>
                <div className="text">
                  <h3 className="heading"><a href={links[13]?.href ?? "#"}>{links[13]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}</a></h3>
                  <div className="meta">
                    <div><a href={links[14]?.href ?? "#"}><span className="icon-calendar"></span> {links[14]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[15]?.href ?? "#"}><span className="icon-person"></span> {links[15]?.text ?? "Admin"}</a></div>
                    <div><a href={links[16]?.href ?? "#"}><span className="icon-chat"></span> {links[16]?.text ?? "19"}</a></div>
                  </div>
                </div>
              </div>
              <div className="block-21 mb-4 d-flex">
                <a className="blog-img mr-4" style={{ backgroundImage: `url(${images[5]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_3.jpg"})` }}></a>
                <div className="text">
                  <h3 className="heading"><a href={links[13]?.href ?? "#"}>{links[13]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}</a></h3>
                  <div className="meta">
                    <div><a href={links[14]?.href ?? "#"}><span className="icon-calendar"></span> {links[14]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[15]?.href ?? "#"}><span className="icon-person"></span> {links[15]?.text ?? "Admin"}</a></div>
                    <div><a href={links[16]?.href ?? "#"}><span className="icon-chat"></span> {links[16]?.text ?? "19"}</a></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sidebar-box ftco-animate">
              <h3>{text[36]?.value ?? "Tag Cloud"}</h3>
              <div className="tagcloud">
                <a href={links[17]?.href ?? "#"} className="tag-cloud-link">{links[17]?.text ?? "house"}</a>
                <a href={links[18]?.href ?? "#"} className="tag-cloud-link">{links[18]?.text ?? "clean"}</a>
                <a href={links[19]?.href ?? "#"} className="tag-cloud-link">{links[19]?.text ?? "washing"}</a>
                <a href={links[20]?.href ?? "#"} className="tag-cloud-link">{links[20]?.text ?? "wash"}</a>
                <a href={links[21]?.href ?? "#"} className="tag-cloud-link">{links[21]?.text ?? "pressure"}</a>
                <a href={links[22]?.href ?? "#"} className="tag-cloud-link">{links[22]?.text ?? "machine"}</a>
                <a href={links[23]?.href ?? "#"} className="tag-cloud-link">{links[23]?.text ?? "roof"}</a>
              </div>
            </div>
            <div className="sidebar-box ftco-animate">
              <h3>{text[44]?.value ?? "Paragraph"}</h3>
              <p>{text[45]?.value ?? "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut, sunt placeat nam vero culpa sapiente consectetur similique, inventore eos fugit cupiditate numquam!"}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-6">
        <div
          style={{
            position: "sticky",
            top: "calc(env(safe-area-inset-top, 0px) + 12px)",
            zIndex: 10,
            maxHeight: "calc(100svh - 16px)",
            overflowY: "auto",
            overflowX: "hidden",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
            paddingBottom: 8,
            maxWidth: "100%",
          }}
        >
          <OverlayEditor route={ROUTE} overlayKey={OVERLAY_KEY} />
        </div>
      </div>
    </section>
  );
}