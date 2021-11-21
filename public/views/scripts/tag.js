const renderTagView = async () => {
  const tagPostWrapper = document.querySelector("#tag__container_wrapper");
  await fetch("http://localhost:3000/api/post/feminism", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      console.log(result);
      const postList = result.posts;
      postList.forEach((post) => {
        let postHtml = `
            <div class="tag__container__right">
            <div class="tag__container__right__person">
              <img src="../images/avatar.jpg" alt="avatar" />
              <div class="tag__container__right__person__info">
                <div class="tag__container__right__person__title">
                  <span class="tag__container__right__person__title__name" id="person-name">${post.author}</span>
                  <span class="tag__container__right__person__title__in">
                    in </span>
                  <span class="tag__container__right__person__title__name" id="person-fearless">Fearless She
                    Wrote</span>
                </div>
                <div class="tag__container__right__person__time">
                  <span>Nov 10 &middot; </span>
                  <span>4 minus read</span>
                  <span><i class="fas fa-star"></i></span>
                </div>
              </div>
            </div>
            <div class="tag__container__right__img">
              <a href="post.html"><img src="${post.imageUrl}" alt="tag_post_img" style="height: 400px;"/></a>
            </div>
            <div class="tag__container__right__post">
              <a href="post.html">
                <h2>${post.title}</h2>
              </a>
            </div>
            <div class="tag__container__right__post">
              <a href="post.html">
                <p>
                    ${post.content}...
                </p>
              </a>
            </div>
            <div class="tag__container__right__post__more">
              <a href="#">
                <p>Read more ...</p>
              </a>
            </div>
            <div class="tag__container__right__response">
              <div class="tag__container__right__response__left">
                <i class="fas fa-hand-holding-heart"></i> 335
              </div>
              <div class="tag__container__right__response__right">
                <span><a href="#">4 responses</a></span>
                <span class="tag__container__right__response__right__bookmark"><a href="#"><i
                      class="far fa-bookmark"></i></a></i><i class="fas fa-bookmark hidden"></i></span>
              </div>
            </div>
            <div id="hover-person" class="tag__container__right__hover-name hidden">
              <div class="details">
                <div class="details__wrap">
                  <div class="name">
                    <h2>Elise LaChapelle</h2>
                  </div>
                  <div class="member-info">Medium member since Mar 2021</div>
                  <div class="job">Freelance writer, business owner, fitness fanatic, mom of girls.</div>
                </div>
                <div class="details__img">
                  <img src="../images/avatar.jpg" alt="avatar">
                </div>
              </div>
              <hr />
              <div class="follow">
                <div class="people">Followed by 130 people</div>
                <div class="follow-link">Follow</div>
              </div>
            </div>
    
            <div id="hover-fearless" class="tag__container__right__hover-name fearless hidden">
              <div class="details">
                <div class="details__wrap">
                  <div class="name">
                    <h2>Fearless She Wrote</h2>
                  </div>
                  <div class="job">This is a space to empower differences, tell our stories, and share our lives together.
                    We will not be silenced. We will be fearless. And we will write.</div>
                </div>
                <div class="details__img">
                  <img src="../images/feminism.png" alt="avatar">
                </div>
              </div>
              <hr />
              <div class="follow">
                <div class="people">Followed by 18.7K people</div>
                <div class="follow-link">Follow</div>
              </div>
            </div>
          </div>`;
        tagPostWrapper.innerHTML += postHtml;
      });

      const bookmark_regular = document.querySelector(".far.fa-bookmark");
      const bookmark_solid = document.querySelector(".fas.fa-bookmark");
      const personName = document.querySelector("#person-name");
      const hoverPerson = document.querySelector("#hover-person");
      const personFearless = document.querySelector("#person-fearless");
      const hoverFearless = document.querySelector("#hover-fearless");

      personName.addEventListener("mouseover", () => {
        hoverPerson.classList.remove("hidden");
      });

      personName.addEventListener("mouseout", () => {
        hoverPerson.classList.add("hidden");
      });

      personFearless.addEventListener("mouseover", () => {
        hoverFearless.classList.remove("hidden");
      });

      personFearless.addEventListener("mouseout", () => {
        hoverFearless.classList.add("hidden");
      });

      const toogle_bookmark = () => {
        bookmark_regular.classList.toggle("hidden");
        bookmark_solid.classList.toggle("hidden");
      };
      bookmark_regular.addEventListener("click", toogle_bookmark);
      bookmark_solid.addEventListener("click", toogle_bookmark);
    });
};

renderTagView();
