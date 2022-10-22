import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Pair = ({base, pair}) => {
  
    return(
        <>
        <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {base}/{pair["0"]}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {pair["1"]}
                </Typography>
              </CardContent>
            </Card>

        </>
    )
}

export {Pair}
