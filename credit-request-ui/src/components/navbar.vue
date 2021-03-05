<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img
          src="https://www.nexoos.com.br/wp-content/themes/nexoos/build/imgs/logo.svg"
          width="112"
          height="28"
        />
      </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">
          <a class="navbar-item">
            Home
          </a>
        </router-link>
        <router-link to="/client" class="navbar-item">
          <a class="navbar-item">
            Cliente
          </a>
        </router-link>
        <router-link to="/credit" class="navbar-item">
          <a class="navbar-item">
            Crédito
          </a>
        </router-link>
        <router-link to="/loan" class="navbar-item">
          <a class="navbar-item">
            Empréstimo
          </a>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>
