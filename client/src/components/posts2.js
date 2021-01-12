// in src/posts.js
import * as React from "react";
import { List, SimpleList, Grid } from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export const PostList2 = (props) => (
    <List {...props}>
        <Typography source="title">sss</Typography>
    </List>
);