(async function() {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  const image = await loadImage('space.jpg')
  const mouse = getMouse(canvas)

  const filterGrayInput = document.getElementById('filterGray')
  const filterRedInput = document.getElementById('filterRed')
  const filterBlueInput = document.getElementById('filterBlue')
  const filterGreenInput = document.getElementById('filterGreen')

  const imageParams = {
    offsetX: 0,
    offsetY: 0,
    scale: 1
  }

  mouse.update = () => {
    mouse.dx = 0
    mouse.dy = 0
    mouse.wheel = 0
  }

  canvas.width = 750
  canvas.height = 750

  update()

  function update() {
    requestAnimationFrame(update)

    clearCanvas()

    if (mouse.left) {
      imageParams.offsetX += mouse.dx
      imageParams.offsetY += mouse.dy
    }

    if (mouse.wheel) {
      imageParams.scale -= mouse.wheel / 1000
    }

    context.drawImage(
      image,
      0, 0, image.width, image.height,
      imageParams.offsetX,
      imageParams.offsetY,
      image.width * imageParams.scale,
      image.height * imageParams.scale
    )

    mouse.update()
  }

  function clearCanvas() {
    canvas.width = canvas.width
  }

  filterGrayInput.addEventListener('change', () => {})
	filterRedInput.addEventListener('change', () => {
		const canvas = document.createElement('canvas')
		const contex = canvas.getContext('2d')
		canvas.width = image.width
		canvas.height = image.height
		contex.drawImage(
			image,
			0, 0, image.width, image.height,
			0, 0, image.width, image.height
			)
		
		const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
		console.log(imageData)
	})
	filterBlueInput.addEventListener('change', () => {
		console.log('filterBlueInput fired', filterBlueInput.checked)
	})
	filterGreenInput.addEventListener('change', () => {
		console.log('filterGreenInput fired', filterGreenInput.checked)
	})
})()