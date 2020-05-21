export default class HomePage {
  constructor() {
    this.template();
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
      <section id="home" class="page">
        <!-- <header class="topbar">
          <h2>Home</h2>
        </header> -->
        <h1>Camino Frøs Herred</h1>
        
        <div id="mapid"></div>
      </section>
    `;
  }

}