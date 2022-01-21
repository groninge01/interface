import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button, Divider, ListItemIcon, ListItemText, MenuList, SvgIcon } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/system';
import React from 'react';

import { Link } from '../components/Link';
import { moreNavigation } from '../ui-config/menu-items';
import { ColorModeContext } from './AppGlobalStyles';

export default function MoreMenu() {
  const { i18n } = useLingui();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        size="medium"
        aria-label="more"
        id="more-button"
        aria-controls={open ? 'more-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        disableRipple
        sx={(theme) => ({
          ...theme.typography.subheader1,
          color: 'common.white',
          p: 0,
          minWidth: 'unset',
          borderRadius: 0,
        })}
      >
        <Trans>More</Trans>
        <MoreHorizIcon color="inherit" />
      </Button>

      <Menu
        id="more-menu"
        MenuListProps={{
          'aria-labelledby': 'more-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            minWidth: 240,
          },
        }}
      >
        <MenuList>
          {moreNavigation.map((item, index) => (
            <MenuItem component={Link} href={item.link} key={index}>
              <ListItemIcon>
                <SvgIcon sx={{}}>{item.icon}</SvgIcon>
              </ListItemIcon>
              <ListItemText>{i18n._(item.title)}</ListItemText>
            </MenuItem>
          ))}

          <Divider />

          <MenuItem onClick={colorMode.toggleColorMode}>
            <ListItemIcon>
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </ListItemIcon>
            <ListItemText>
              Switch to {theme.palette.mode === 'dark' ? 'light' : 'dark'} mode
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
