"use client";

import * as React from "react";
import { Popper } from "@mui/base/Popper";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import HomeRounded from "@mui/icons-material/HomeRounded";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Person from "@mui/icons-material/Person";
import FactCheck from "@mui/icons-material/FactCheck";
import PersonRounded from "@mui/icons-material/PersonRounded";

const useRovingIndex = (options) => {
  const {
    initialActiveIndex = 0,
    vertical = false,
    handlers = { onKeyDown: () => {} },
  } = options || {};
  const [activeIndex, setActiveIndex] = React.useState(initialActiveIndex);
  const targetRefs = React.useRef([]);
  const targets = targetRefs.current;

  const focusNext = () => {
    let newIndex = activeIndex + 1;
    if (newIndex >= targets.length) {
      newIndex = 0;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };

  const focusPrevious = () => {
    let newIndex = activeIndex - 1;
    if (newIndex < 0) {
      newIndex = targets.length - 1;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };

  const getTargetProps = (index) => ({
    ref: (ref) => {
      if (ref) {
        targets[index] = ref;
      }
    },
    tabIndex: activeIndex === index ? 0 : -1,
    onKeyDown: (event) => {
      if (Number.isInteger(activeIndex)) {
        if (event.key === (vertical ? "ArrowDown" : "ArrowRight")) {
          focusNext();
        }
        if (event.key === (vertical ? "ArrowUp" : "ArrowLeft")) {
          focusPrevious();
        }
        handlers.onKeyDown?.(event, { setActiveIndex });
      }
    },
    onClick: () => {
      setActiveIndex(index);
    },
  });

  return {
    activeIndex,
    setActiveIndex,
    targets,
    getTargetProps,
    focusNext,
    focusPrevious,
  };
};

const AboutMenu = React.forwardRef(({ focusNext, focusPrevious, ...props }, ref) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { targets, setActiveIndex, getTargetProps } = useRovingIndex({
    initialActiveIndex: null,
    vertical: true,
    handlers: {
      onKeyDown: (event, fns) => {
        if (event.key.match(/(ArrowDown|ArrowUp|ArrowLeft|ArrowRight)/)) {
          event.preventDefault();
        }
        if (event.key === "Tab") {
          setAnchorEl(null);
          fns.setActiveIndex(null);
        }
        if (event.key === "ArrowLeft") {
          setAnchorEl(null);
          focusPrevious();
        }
        if (event.key === "ArrowRight") {
          setAnchorEl(null);
          focusNext();
        }
      },
    },
  });

  const open = Boolean(anchorEl);
  const id = open ? "about-popper" : undefined;

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <div onMouseLeave={() => setAnchorEl(null)}>
        <ListItemButton
          aria-haspopup
          aria-expanded={open ? "true" : "false"}
          ref={ref}
          {...props}
          role="menuitem"
          onKeyDown={(event) => {
            props.onKeyDown?.(event);
            if (event.key.match(/(ArrowLeft|ArrowRight|Tab)/)) {
              setAnchorEl(null);
            }
            if (event.key === "ArrowDown") {
              event.preventDefault();
              targets[0]?.focus();
              setActiveIndex(0);
            }
          }}
          onFocus={(event) => setAnchorEl(event.currentTarget)}
          onMouseEnter={(event) => {
            props.onMouseEnter?.(event);
            setAnchorEl(event.currentTarget);
          }}
        >
          Student <KeyboardArrowDown />
        </ListItemButton>
        <Popper id={id} open={open} anchorEl={anchorEl} disablePortal keepMounted>
          <List
            role="menu"
            aria-label="About"
            variant="outlined"
            sx={{
              my: 2,
              boxShadow: "md",
              borderRadius: "sm",
              minWidth: 180,
              opacity: 2, // Set opacity for dropdown
              backgroundColor: 'white', // Ensure background color is set
              "--List-radius": "8px",
              "--List-padding": "4px",
              "--ListDivider-gap": "4px",
            }}
          >
            <ListItem role="none">
              <ListItemButton role="menuitem" {...getTargetProps(0)} component='a' href="/page/create/students">
                <ListItemDecorator>
                  <Person />
                </ListItemDecorator>
                Add a student
              </ListItemButton>
            </ListItem>
            <ListItem role="none">
              <ListItemButton role="menuitem" {...getTargetProps(1)} component='a' href="/page/attend/student">
                <ListItemDecorator>
                  <FactCheck />
                </ListItemDecorator>
                Attendance
              </ListItemButton>
            </ListItem>
             
          </List>
        </Popper>
      </div>
    </ClickAwayListener>
  );
});

const AdmissionsMenu = React.forwardRef(({ focusNext, focusPrevious, ...props }, ref) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { targets, setActiveIndex, getTargetProps } = useRovingIndex({
    initialActiveIndex: null,
    vertical: true,
    handlers: {
      onKeyDown: (event, fns) => {
        if (event.key.match(/(ArrowDown|ArrowUp|ArrowLeft|ArrowRight)/)) {
          event.preventDefault();
        }
        if (event.key === "Tab") {
          setAnchorEl(null);
          fns.setActiveIndex(null);
        }
        if (event.key === "ArrowLeft") {
          setAnchorEl(null);
          focusPrevious();
        }
        if (event.key === "ArrowRight") {
          setAnchorEl(null);
          focusNext();
        }
      },
    },
  });

  const open = Boolean(anchorEl);
  const id = open ? "admissions-popper" : undefined;

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <div onMouseLeave={() => setAnchorEl(null)}>
        <ListItemButton
          aria-haspopup
          aria-expanded={open ? "true" : "false"}
          ref={ref}
          {...props}
          role="menuitem"
          onKeyDown={(event) => {
            props.onKeyDown?.(event);
            if (event.key.match(/(ArrowLeft|ArrowRight|Tab)/)) {
              setAnchorEl(null);
            }
            if (event.key === "ArrowDown") {
              event.preventDefault();
              targets[0]?.focus();
              setActiveIndex(0);
            }
          }}
          onFocus={(event) => setAnchorEl(event.currentTarget)}
          onMouseEnter={(event) => {
            props.onMouseEnter?.(event);
            setAnchorEl(event.currentTarget);
          }}
        >
          Teacher <KeyboardArrowDown />
        </ListItemButton>
        <Popper id={id} open={open} anchorEl={anchorEl} disablePortal keepMounted>
          <List
            role="menu"
            aria-label="About"
            variant="outlined"
            sx={{
              my: 2,
              boxShadow: "md",
              borderRadius: "sm",
              minWidth: 180,
              opacity: 1, // Set opacity for dropdown
              backgroundColor: 'white', // Ensure background color is set
              "--List-radius": "8px",
              "--List-padding": "4px",
              "--ListDivider-gap": "4px",
            }}
          >
            <ListItem role="none">
              <ListItemButton role="menuitem" component="a" {...getTargetProps(1)} href="/page/create/teacher">
                <Person />
                Add a teacher
              </ListItemButton>
            </ListItem>
            <ListItem role="none">
              <ListItemButton role="menuitem" {...getTargetProps(2)} component="a" href="/page/attend/teacher">
                <FactCheck />
                Attendance
              </ListItemButton>
            </ListItem>
             
          </List>
        </Popper>
      </div>
    </ClickAwayListener>
  );
});

export default function ExampleNavigationMenu() {
  const { targets, getTargetProps, setActiveIndex, focusNext, focusPrevious } = useRovingIndex();

  return (
    <Box>
      <List
        role="menubar"
        orientation="horizontal"
        className="flex xl:justify-center w-full h-[80px]"
      >
        <ListItem role="none">
          <AboutMenu />
        </ListItem>
        <ListItem role="none">
          <AdmissionsMenu />
        </ListItem>
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            {...getTargetProps(3)}
            component="a"
            href="/page/profile"
          >
            <ListItemDecorator>
              <PersonRounded />
            </ListItemDecorator>
            Profile
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
