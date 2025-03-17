import { Badge, Button, Group, Stack } from '@mantine/core'
import { IconActivity, IconSmartHome } from '@tabler/icons-react'
import { JSX, useMemo } from 'react'
import { NavLink } from 'react-router-dom'

type MenuItem = {
  label: string
  icon: {
    base: JSX.Element
    active: JSX.Element
  }
  link: string
  ai: boolean
}

interface NavigationProps {
  navbarOpened?: boolean
}

export const Navigation: React.FC<NavigationProps> = ({ navbarOpened }) => {
  const menuItems = useMemo<MenuItem[]>(
    () => [
      {
        label: 'Home',
        icon: {
          base: <IconSmartHome />,
          active: <IconSmartHome color="black" />,
        },
        link: '/',
        ai: false,
      },
      {
        label: 'Chat',
        icon: {
          base: <IconActivity />,
          active: <IconActivity color="black" />,
        },
        link: '/chat',
        ai: true,
      },
    ],
    [navbarOpened]
  )

  const items = menuItems.map((item) => (
    <NavLink to={item.link} key={item.label} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <Button
          justify="start"
          fullWidth
          leftSection={item.icon.base}
          styles={{
            inner: {
              '&:hover': {
                color: 'dark_pink.3',
              },
            },
            section: {
              color: isActive ? 'dark_pink.5' : '#fff',
            },
          }}
          variant={isActive ? 'filled' : 'subtle'}
          color={isActive ? 'dark_pink.2' : '#fff'}
          autoContrast
          size="sm"
        >
          {item.ai ? (
            <Group gap={12}>
              {item.label}
              <Badge size="md" circle color="dark_pink.4" c="white">
                AI
              </Badge>
            </Group>
          ) : (
            <>
              <Group gap={12}>{item.label}</Group>
            </>
          )}
        </Button>
      )}
    </NavLink>
  ))
  return (
    <Stack justify="inherit" gap={16} align="inherit">
      {items}
    </Stack>
  )
}
