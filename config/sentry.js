window.onerror = function(m, s, l, c, error) {
  if (window.Raven) {
    window.Raven.captureException(error)
  }
}
