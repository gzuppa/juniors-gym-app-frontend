import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import useAuth from '../../hooks/useAuth'
import TriangleImage from '../../assets/misc/triangle-light.png'
import JuniorsLogo from '../../assets/misc/trophy.png'

const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute',
})

const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute',
})

const WelcomeCard = () => {
  const { auth } = useAuth()

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant="h5" className="text-purple-800" sx={{ mb: 2 }}>
          Hola {auth.name}🏋️‍♂️
        </Typography>
        <Typography variant="body1" sx={{ letterSpacing: '0.25px', mb: 8 }}>
          Panel de bienvenida
        </Typography>
        <Link
          to="/admin/members"
          className="px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-purple-950 to-purple-200 rounded-lg cursor-pointer font-raleway"
        >
          Tus usuarios
        </Link>
        <TriangleImg src={TriangleImage} />
        <TrophyImg src={JuniorsLogo} />
      </CardContent>
    </Card>
  )
}

export default WelcomeCard
