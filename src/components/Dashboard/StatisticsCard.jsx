import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import AlertOctagon from 'mdi-material-ui/AlertOctagon'
import Bike from 'mdi-material-ui/Bike'
import Cash100 from 'mdi-material-ui/Cash100'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import CurrencyUsdOff from 'mdi-material-ui/CurrencyUsdOff'
import Dumbbell from 'mdi-material-ui/Dumbbell'
import WeightLifter from 'mdi-material-ui/WeightLifter'
import useMembers from '../../hooks/useMembers'
import BlockedModalUsers from '../Modals/BlockedModalUsers'
import PendingPayUsersModal from '../Modals/PendingPayUsersModal'
import PaidUsersModal from '../Modals/PaidUsersModal'

const StatsGrid = props => {
  return (
    <Grid item xs={12} sm={3} key={props.index}>
      <Box key={props.index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant="rounded"
          sx={{
            mr: 1.5,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${props.color}.main`,
          }}
        >
          {props.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="caption">{props.title}</Typography>
          <Typography variant="h6">{props.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  )
}

const RenderStatusStats = () => {
  const { allMembers } = useMembers()
  const beginners = allMembers.filter(element => {
    return element.memberLevel === 'Principiante'
  })
  const inter = allMembers.filter(element => {
    return element.memberLevel === 'Intermedio'
  })
  const advanced = allMembers.filter(element => {
    return element.memberLevel === 'Avanzado'
  })

  const statsData = [
    {
      stats: allMembers.length,
      title: 'Total',
      color: 'success',
      icon: <AccountGroup sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: beginners.length,
      title: 'Principiante',
      color: 'info',
      icon: <Bike sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: inter.length,
      color: 'secondary',
      title: 'Intermedio',
      icon: <Dumbbell sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: advanced.length,
      color: 'error',
      title: 'Avanzado',
      icon: <WeightLifter sx={{ fontSize: '1.75rem' }} />,
    },
  ]
  return statsData.map((item, index) => (
    <StatsGrid
      color={item.color}
      title={item.title}
      stats={item.stats}
      icon={item.icon}
      index={index}
    />
  ))
}

const RenderLevelStats = () => {
  const {
    allMembers,
    handlePaidUsersModal,
    handleBlockedUsersModal,
    handlePendingUsersModal,
  } = useMembers()

  const paid = allMembers.filter(element => {
    return element.status === 'Pagado'
  })
  const paidPending = allMembers.filter(element => {
    return element.status === 'Por pagar'
  })
  const blocked = allMembers.filter(element => {
    return element.status === 'Bloqueado'
  })

  const statsData = [
    {
      title: 'Status de pago',
      color: 'success',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: paid.length,
      title: 'Pagado',
      color: 'info',
      icon: (
        <button type="button" onClick={handlePaidUsersModal}>
          <Cash100 sx={{ fontSize: '1.75rem' }} />
        </button>
      ),
    },
    {
      stats: paidPending.length,
      color: 'secondary',
      title: 'Por pagar',
      icon: (
        <button type="button" onClick={handlePendingUsersModal}>
          <CurrencyUsdOff sx={{ fontSize: '1.75rem' }} />
        </button>
      ),
    },
    {
      stats: blocked.length,
      color: 'error',
      title: 'Bloqueado',
      icon: (
        <button type="button" onClick={handleBlockedUsersModal}>
          <AlertOctagon sx={{ fontSize: '1.75rem' }} />
        </button>
      ),
    },
  ]
  return statsData.map((item, index) => (
    <>
      <StatsGrid
        color={item.color}
        title={item.title}
        stats={item.stats}
        icon={item.icon}
        index={index}
      />
      <PaidUsersModal />
      <PendingPayUsersModal />
      <BlockedModalUsers />
    </>
  ))
}

const StatisticsCard = () => {
  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="body1">
            <Box
              component="span"
              sx={{ fontWeight: 600, color: 'text.primary' }}
            >
              Resumen de usuarios
            </Box>{' '}
            😎 en total
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important',
          },
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {RenderStatusStats()}
        </Grid>
        <Grid container spacing={[5, 0]}>
          {RenderLevelStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
