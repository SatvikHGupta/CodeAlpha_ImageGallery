const grid = document.getElementById("grid")
const filterBtns = [...document.querySelectorAll(".filter-btn")]
const lightbox = document.getElementById("lightbox")
const lbImg = document.getElementById("lbImg")
const lbPrev = document.getElementById("lbPrev")
const lbNext = document.getElementById("lbNext")
const lbClose = document.getElementById("lbClose")

let items = [...document.querySelectorAll(".card")]
let current = 0

function applyFilter(f) {
  filterBtns.forEach(b =>
    b.classList.toggle("active", b.dataset.filter === f || (f === "all" && b.dataset.filter === "all"))
  )
  items.forEach(el => {
    const show = f === "all" || el.dataset.category === f
    el.style.display = show ? "block" : "none"
  })
}

filterBtns.forEach(b => b.addEventListener("click", () => applyFilter(b.dataset.filter)))

function openLightbox(i) {
  current = i
  const img = items[i].querySelector("img").src
  lbImg.src = img
  lightbox.classList.remove("hidden")
}

function next() {
  current = (current + 1) % items.length
  lbImg.src = items[current].querySelector("img").src
}

function prev() {
  current = (current - 1 + items.length) % items.length
  lbImg.src = items[current].querySelector("img").src
}

items.forEach((el, i) => el.addEventListener("click", () => openLightbox(i)))
lbClose.addEventListener("click", () => lightbox.classList.add("hidden"))
lbNext.addEventListener("click", next)
lbPrev.addEventListener("click", prev)

document.addEventListener("keydown", e => {
  if (lightbox.classList.contains("hidden")) return
  if (e.key === "Escape") lightbox.classList.add("hidden")
  if (e.key === "ArrowRight") next()
  if (e.key === "ArrowLeft") prev()
})

applyFilter("all")
