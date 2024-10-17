import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { Delete } from '@mui/icons-material';


export default function ContextMenu({fetchGallery,setOpenContext, fileData }) {
  async function Removehandeler() {
    // try {
    //   await apiHelper.removeFile(fileData._id)
    //   setOpenContext({})
    //   fetchGallery()
    // } catch (error) {
    //   console.log(error)
    // }
  }

  return (
    <Paper sx={{ width: 320, maxWidth: '100%', position: "absolute", zIndex: "1000", top: "30%", left: "30%" }}>
      <MenuList>
        <MenuItem  onClick={Removehandeler}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Remove</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy Address</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
