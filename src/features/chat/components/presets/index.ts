import { useNavigate } from 'react-router-dom'
//import { openModalAuth } from '../AuthModal/store/useModalAuth'

export const Presets = () => {
  const navigate = useNavigate()
  const AuthModalButton = [
    {
      label: 'Authorize',
      onClick: () => console.log('Authorize please!'), //openModalAuth(),
    },
  ]
  const presetButtons = [
    {
      label: 'US',
      onClick: () =>
        navigate(
          '/rising-sounds?sorting=rise&days=1&order=desc&take=20&videosLocation=US'
        ),
    },
    {
      label: 'UK',
      onClick: () =>
        navigate(
          '/rising-sounds?sorting=rise&days=1&order=desc&take=20&videosLocation=GB'
        ),
    },
    {
      label: 'MX',
      onClick: () =>
        navigate(
          '/rising-sounds?sorting=rise&days=1&order=desc&take=20&videosLocation=MX'
        ),
    },
    {
      label: 'UA',
      onClick: () =>
        navigate(
          '/rising-sounds?sorting=rise&days=1&order=desc&take=20&videosLocation=UA'
        ),
    },
    {
      label: 'World',
      onClick: () =>
        navigate('/rising-sounds?sorting=rise&days=1&order=desc&take=20'),
    },
  ]
  const defaultButtons = [
    { label: '', onClick: () => {} },
    {
      label: 'Go Home',
      onClick: () => navigate('/'),
    },
    // {
    //   label: 'Time to post',
    //   onClick: () => navigate('/time-to-post'),
    // },
    // {
    //   label: 'Ideas to post',
    //   onClick: () => navigate('/video-history'),
    // },
    // {
    //   label: 'Account analytics',
    //   onClick: () => navigate('/my-account-analytics'),
    // },
    // {
    //   label: 'Rising Sounds',
    //   onClick: () => navigate('/rising-sounds'),
    // },
  ]

  return {
    defaultButtons,
    presetButtons,
    AuthModalButton,
  }
}
