import { Box, Skeleton, Typography } from '@mui/material'

export default function BoxResult(props) {
  const { loading, amount, fromValue, toValue, result } = props
  return (
    <>
      <Box sx={{ textAlign: 'left', marginTop: '1rem' }}>
        {loading ? (
          <Skeleton style={{ height: '4rem' }} />
        ) : (
          <>
            {result.status === 200 && (
              <>
                <Typography>
                  {amount} <img style={{ width: '20px' }} src={fromValue?.flag} alt={fromValue?.code} />{' '}
                  {fromValue?.code} =
                </Typography>

                <Typography variant='h5' sx={{ marginTop: '5px', fontWeight: 'bold' }}>
                  {result.total} <img style={{ width: '20px' }} src={toValue?.flag} alt={toValue?.code} />{' '}
                  {toValue?.code}
                </Typography>
              </>
            )}

            {result.status === 422 && (
              <>
                <Typography variant='h6' sx={{ marginTop: '2rem', fontWeight: 'bold', color: '#c1121f' }}>
                  {result.msg}
                </Typography>
              </>
            )}
          </>
        )}
      </Box>
    </>
  )
}
