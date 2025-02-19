// TextScramble

class TextScramble {
    constructor(el) {
    this.el = el
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    this.update = this.update.bind(this)
    }
    setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 60)
      const end = start + Math.floor(Math.random() * 60)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
    }
    update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.3) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
    }
    randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
    }
    
    // Example
    
    const phrases = [
    'GPG Fingerprint',    
    'D195 AB97 7EB2 02D2 F76A A1A5 ADC4 150D 5FA1 E100',    
    ]
    
    const el = document.querySelector('.text')
    const fx = new TextScramble(el)
    
    // call "PGP Fingerprint"
    const next = () => {
        fx.setText(phrases[0]).then(() => {
        setTimeout(next2, 2000)
    })
    }

    // call "D195 [...] E100"
    const next2 = () => {
        fx.setText(phrases[1]).then(() => {
    })
    }
    
    next()
