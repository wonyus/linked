"use client";
import AdbIcon from "@mui/icons-material/Adb";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Theme, useColorScheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Mode } from "@mui/system/cssVars/useCurrentColorScheme";
import * as React from "react";

import { useCurrentUser } from "@/hooks/use-current-user";
import { text } from "stream/consumers";

const pages = [
  { text: "Home", href: "home" },
  { text: "Device", href: "device" },
];
const settings = [
  { text: "Home", href: "home" },
  { text: "Device", href: "device" },
  {text: "Setting", href: "setting"},
  { text: "Logout", href: "/api/auth/signout" },
];

function Navbar() {
  const user = useCurrentUser();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { mode, setMode } = useColorScheme();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const ModeIconButton = (mode: Mode | undefined): React.JSX.Element => {
    return (
      <>
        {mode === "dark" && (
          <Fade in={mode === "dark"} timeout={1500}>
            <IconButton
              onClick={() => {
                setMode("light");
              }}
              color="inherit"
              sx={{ mr: 1 }}
            >
              <WbSunnyIcon />
            </IconButton>
          </Fade>
        )}
        {mode === "light" && (
          <Fade in={mode === "light"} timeout={1500}>
            <IconButton
              onClick={() => {
                setMode("dark");
              }}
              color="inherit"
              sx={{ mr: 1 }}
            >
              <DarkModeIcon />
            </IconButton>
          </Fade>
        )}
      </>
    );
  };

  return (
    <AppBar position="static" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                  <Typography component={Link} href={page.href} textAlign="center" style={{ textDecoration: "none" }}>
                    {page.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button key={page.text} href={page.href} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                {page.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user && ModeIconButton(mode)}

            {user && (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.username} src={user?.image ?? "/static/images/avatar/2.jpg"} />
                </IconButton>
              </Tooltip>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.text} onClick={handleCloseUserMenu} sx={{ width: 120 }}>
                  <Typography
                    component={Link}
                    href={setting.href}
                    textAlign="center"
                    sx={{ textDecoration: "none", color: (theme: Theme) => theme.palette.text.primary }}
                  >
                    {setting.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
