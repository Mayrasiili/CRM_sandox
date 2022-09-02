import React from 'react';
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { AppShell, createStyles, Navbar, UnstyledButton, Tooltip, Title, Button, Collapse  } from '@mantine/core';
import {
  Home2,
  Gauge,
  DeviceDesktopAnalytics,
  Fingerprint,
  CalendarStats,
  User,
  Settings,
  ChevronRight,
  ChevronDown
} from 'tabler-icons-react';

import ROUTING from "./configuration/routing.js";
import APP from "./configuration/config.js";
import Login from "./general/login/Login.jsx";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
  },

  aside: {
    flex: '0 0 60px',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  main: {
    flex: 1,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  mainLink: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
    },
  },

  title: {
    boxSizing: 'border-box',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: 18,
    height: 60,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  logo: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: 60,
    paddingTop: theme.spacing.md,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    marginBottom: theme.spacing.xl,
  },

  link: {
    boxSizing: 'border-box',
    display: 'block',
    textDecoration: 'none',
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: 44,
    lineHeight: '44px',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  linkActive: {
    '&, &:hover': {
      borderLeftColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
      backgroundColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
      color: theme.white,
    },
  },

  linkListWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100% - 90px)',
      justifyContent: 'space-between'
  }
}));

export default function App() {
    const { classes, cx } = useStyles();
    const location = useLocation();

    const [login, setLogin] = React.useState(false);
    const [active, setActive] = React.useState(ROUTING.menuItems.find(e => e.system === location.pathname.split("/")[1]) ? location.pathname.split("/")[1] : "home");
    const [activeLink, setActiveLink] = React.useState(location.pathname);
    const [submenuOpen, setSubmenuOpen] = React.useState(false);

    React.useEffect(() => {
        let succ = false;
        let systemName = location.pathname.split("/")[1];
        let item = ROUTING.menuItems.find(e => e.system === systemName);
        if(item) {
            let link = item.children.find(e => e.link === location.pathname || e?.children?.find(n => n.link === location.pathname));
            if(link) {
                if(link.children) {
                    let subLink = link.children.find(e => e.link === location.pathname);
                    if(subLink) {
                        setActiveLink(subLink.link);
                        succ = true;
                    }
                }
                else {
                    console.log("found")
                    setActiveLink(link.link);
                    succ = true;
                }
            }
        }
        if(!succ) {
            setActive("home");
            setActiveLink("/home/");
        }
    }, [location]);

    const logIn = response => {
        setLogin(response);
    }
    const logOut = () => {
        localStorage.removeItem(APP.TOKEN_KEY);
        setLogin(false);
    }

    if(!login) return <Login login={logIn}/>
    else return (
        <AppShell
            padding="sm"
            navbar={<Navbar width={{ sm: 300 }}>
                <Navbar.Section grow className={classes.wrapper}>
                    <div className={classes.aside}>
                    <div className={classes.logo}>

                    </div>
                    {ROUTING.menuItems.map((item, index) => (
                        <Tooltip label={item.name} position="right" withArrow transitionDuration={0} key={item.name}>
                            <UnstyledButton
                                onClick={() => setActive(item.system)}
                                className={cx(classes.mainLink, { [classes.mainLinkActive]: item.system === active })}
                            >
                            <item.icon />
                            </UnstyledButton>
                        </Tooltip>
                    ))}
                    </div>
                    <div className={classes.main}>
                        <Title order={4} className={classes.title}>
                            {ROUTING.menuItems.find(e => e.system === active).name}
                        </Title>

                        <div className={classes.linkListWrapper}>
                            <div>
                                {ROUTING.menuItems.find(e => e.system === active).children.map((link, index) => (
                                    <>
                                        {!link.children &&
                                            <Link
                                                to={link.link}
                                                className={cx(classes.link, { [classes.linkActive]: activeLink === link.link })}
                                                key={link.name}
                                            >
                                                {link.name}
                                            </Link>
                                        } {link.children &&
                                            <>
                                                <div
                                                    className={cx(classes.link, { [classes.linkActive]: link.children.find(e => e.link === activeLink)})}
                                                    onClick={() => {
                                                        if(submenuOpen !== link.link) setSubmenuOpen(link.link)
                                                        else setSubmenuOpen(false)
                                                    }}
                                                    style={{cursor:"pointer", userSelect:"none"}}
                                                >
                                                    {submenuOpen === link.link ? <ChevronDown size={12}/> : <ChevronRight size={12}/>} {link.name}
                                                </div>
                                                <Collapse in={submenuOpen === link.link} style={{marginLeft:"20px", marginTop:"4px"}}>
                                                    {link.children.map((childLink, childIndex) => (
                                                        <Link
                                                            to={childLink.link}
                                                            className={cx(classes.link, { [classes.linkActive]: activeLink === childLink.link })}
                                                            key={childLink.name}
                                                            style={{borderRadius:"8px"}}
                                                        >
                                                            {childLink.name}
                                                        </Link>
                                                    ))}
                                                </Collapse>
                                            </>
                                        }
                                    </>
                                ))}
                            </div>
                            <div>
                                <Button fullWidth mt="md" size="sm" onClick={() => logOut()}>
                                  Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </Navbar.Section>
            </Navbar>}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            <Routes>
                {ROUTING.menuItems.map((item, index) => (
                    item.children.map(link => (
                        <>
                            {!link.children && <Route path={link.link} element={link.component}/>}
                            {link.children &&
                                link.children.map(childLink => (
                                    <Route path={childLink.link} element={childLink.component}/>
                                ))
                            }
                        </>
                    ))
                ))}
            </Routes>
        </AppShell>
  );
}
