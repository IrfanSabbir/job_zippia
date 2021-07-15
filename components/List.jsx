import React from 'react';
import { Paper, makeStyles, Grid, Divider } from '@material-ui/core'

// creating Material ui style to customize the mui components
const useStayle = makeStyles({
    root: {
      textAlign:"center",
      paddingTop: "20px"
    },
    paper:{

        width: "100%", 
        padding:"20px", 
        marginBottom: "20px",
        cursor: "pointer",
        "&:hover": {
            background:"#eeeeee"
        }
    },
    title: {
        textAlign: "center",
        color: "#ff6347",
        fontWeight: "bold",
        "&:hover": {
            color:"#a3a3a6",
        }
    },
    subTitle: {
        color: "#a3a3a6",
        width: "100%",
        fontWeight: "bold",
        fontSize:"18px",
        "&:hover": {
            color:"#090765",
            width: "100%",
        }
    },
    description: {
        textAlign:"left",
        borderRadius:"5px",
        backgroundColor:"#ECF0FF",
        width:"100%",
        height:"auto",
        padding:"10px",
        "&:hover": {
            backgroundColor:"white",
            width: "100%",
        }
    },
    divider:{
        color: "#ff6347",
        background: "#ff6347",
        margin: "10px 0px",
    },
  })

export const Joblist = (props) => 
{
    // useStayle is called to use the styled decalred above
    const classes = useStayle()
    return (
        <Grid container spacing={3}>
            {
                // maping the list of jobs we have passed from parent component
                props.list.map( (item, i) => {
                    // return every card created to be visible in ui
                    //using grid to do responsiveness 
                    // showing jobTitle, coompanyName and shortDescription in evry Card 
                    return(
                        <Grid key={i} item xs={12} sm={6} md={4} lg={4}>
                            <Paper variant="elevation" elevation={5} className={classes.paper}>
                                <h2 className={classes.title}>{item.jobTitle}</h2>
                                {/* <hr/> */}
                                <Divider className={classes.divider}/>
                                <h5 className={classes.subTitle}>{item.companyName}</h5>
                                <p className={classes.description}>{item.shortDesc}</p>
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
 
    )
}
