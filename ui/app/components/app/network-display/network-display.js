import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import {
  MAINNET_NETWORK_ID,
  ROPSTEN_NETWORK_ID,
  RINKEBY_NETWORK_ID,
  KOVAN_NETWORK_ID,
  GOERLI_NETWORK_ID,
} from '../../../../../app/scripts/controllers/network/enums'
import LoadingIndicator from '../../ui/loading-indicator'
import ColorIndicator from '../../ui/color-indicator'
import { COLORS, TYPOGRAPHY } from '../../../helpers/constants/design-system'
import Chip from '../../ui/chip/chip'
import { useI18nContext } from '../../../hooks/useI18nContext'

const networkIdToTypeMap = {
  [MAINNET_NETWORK_ID]: 'mainnet',
  [ROPSTEN_NETWORK_ID]: 'ropsten',
  [RINKEBY_NETWORK_ID]: 'rinkeby',
  [GOERLI_NETWORK_ID]: 'goerli',
  [KOVAN_NETWORK_ID]: 'kovan',
}

export default function NetworkDisplay({
  colored,
  outline,
  iconClassName,
  disabled,
  onClick,
}) {
  const { network, provider } = useSelector((state) => ({
    network: state.metamask.network,
    provider: state.metamask.provider,
  }))
  const { type, nickname } = provider
  const t = useI18nContext()
  const networkClass = networkIdToTypeMap[network]

  return (
    <Chip
      borderColor={outline ? COLORS.UI3 : COLORS.TRANSPARENT}
      onClick={onClick}
      leftIcon={
        <LoadingIndicator
          alt={t('attemptingConnect')}
          title={t('attemptingConnect')}
          isLoading={network === 'loading'}
        >
          <ColorIndicator
            color={networkClass ?? COLORS.UI4}
            size="large"
            type={ColorIndicator.TYPES.FILLED}
            iconClassName={!networkClass && 'fa fa-question'}
          />
        </LoadingIndicator>
      }
      rightIcon={
        iconClassName && (
          <i className={classnames('network-display__icon', iconClassName)} />
        )
      }
      label={type === 'rpc' ? nickname ?? t('privateNetwork') : t(type)}
      className={classnames('network-display', {
        'network-display--colored': colored,
        'network-display--disabled': disabled,
        [`network-display--${networkClass}`]: colored && networkClass,
      })}
      labelProps={{
        variant: TYPOGRAPHY.H7,
      }}
    />
  )
}
NetworkDisplay.propTypes = {
  colored: PropTypes.bool,
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
}

NetworkDisplay.defaultProps = {
  colored: true,
}
