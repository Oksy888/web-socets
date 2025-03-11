import { AppShell, Badge, Box, Burger, Group, Skeleton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import { MantineLogo } from '@mantinex/mantine-logo'
import { Navigation } from './navbar/Navigation'

export function MainPage() {
  //const pinned = useHeadroom({ fixedAt: 120 })
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

  return (
    <AppShell
      header={{
        height: { base: 60, md: 70, lg: 80 },
        //collapsed: !pinned,
        //offset: false,
      }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <Badge size="xl" variant="outline" color="dark_pink.2" radius="sm">
            Web Sockets example
          </Badge>
          {/* <MantineLogo size={30} /> */}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navigation />
        {/*         
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))} */}
      </AppShell.Navbar>
      <AppShell.Main style={{ justifyContent: 'center', gap: 15 }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
