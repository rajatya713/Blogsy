import logo from '/images/logo.png'
function Logo({width = '40px'}) {
  return (
    <img src={logo} alt="logo" width={width} />
  )
}

export default Logo