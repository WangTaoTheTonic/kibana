/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { EuiFlexGroup, EuiFlexItem, EuiTitle } from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';
import React from 'react';
import { Space } from '../../../../../common/model/space';
import { SpaceAvatar } from '../../../../components';

interface Props {
  space: Space;
}

export const AdvancedSettingsTitle = (props: Props) => (
  <EuiFlexGroup gutterSize="s" responsive={false} alignItems={'center'}>
    <EuiFlexItem grow={false}>
      <SpaceAvatar space={props.space} />
    </EuiFlexItem>
    <EuiFlexItem style={{ marginLeft: '10px' }}>
      <EuiTitle size="m">
        <h1 data-test-subj="managementSettingsTitle">
          <FormattedMessage
            id="xpack.spaces.management.advancedSettingsTitle.settingsTitle"
            defaultMessage="Settings"
          />
        </h1>
      </EuiTitle>
    </EuiFlexItem>
  </EuiFlexGroup>
);
