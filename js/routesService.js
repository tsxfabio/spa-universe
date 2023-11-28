export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  navigate(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const currentPath = window.location.pathname;
    const route = this.routes[currentPath] || this.routes[404];
    fetch(route)
      .then((response) => response.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      });

    this.updateActiveLink();
  }

  updateActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      if (link.dataset.route === currentPath) {
        link.classList.add("active");
        console.log(link.dataset.route);
      } else {
        link.classList.remove("active");
      }
    });
  }
}
