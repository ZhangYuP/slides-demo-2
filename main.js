let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0
let isDoing = false

makeFakeSlides()
$slides.hide(0, function () {
  $slides.css({ transform: 'translateX(-900px)' }).show()
})
bindEvents()



let timer = setInterval(function () {
  goToSlide(current + 1)
}, 2000)
$('.container').on('mouseenter', function () {
  window.clearInterval(timer)
}).on('mouseleave', function () {
  timer = setInterval(function () {
    goToSlide(current + 1)
  }, 2000)
})


function makeFakeSlides() {
  let $firstCopy = $images.eq(0).clone(true)
  let $lastCopy = $images.eq($images.length - 1).clone(true)

  $slides.append($firstCopy)
  $slides.prepend($lastCopy)
}

function bindEvents() {
  $('#next').on('click', function () {
    !isDoing && goToSlide(current + 1)
  })
  $('#previous').on('click', function () {
    !isDoing && goToSlide(current - 1)
  })
  $('#buttonWrapper').on('click', 'button', function (e) {
    let $button = $(e.currentTarget)
    let index = $button.index()
    !isDoing && goToSlide(index)
  })
}

function goToSlide(index) {
  isDoing = true
  if (index > $images.length - 1) {
    index = 0
  } else if (index < 0) {
    index = $images.length - 1
  }
  if (current === $images.length - 1 && index === 0) {
    $slides.css({ transform: `translateX(${-($images.length + 1) * 900}px)` })
      .one('transitionend', function () {
        $slides.hide(0, function () {
          $slides.css({ transform: `translateX(${-(index + 1) * 900}px)` }).show(0, function () {
            isDoing = false
          })
        })
      })
  } else if (current === 0 && index === $images.length - 1) {
    $slides.css({ transform: `translateX(0px)` })
      .one('transitionend', function () {
        $slides.hide(0, function () {
          $slides.css({ transform: `translateX(${-(index + 1) * 900}px)` }).show(0, function () {
            isDoing = false
          })
        })
      })
  } else {
    $slides.css({ transform: `translateX(${-(index + 1) * 900}px)` })
      .one('transitionend', function () {
        isDoing = false
      })
  }
  current = index
}
