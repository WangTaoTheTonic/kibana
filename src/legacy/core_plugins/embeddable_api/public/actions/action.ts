/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { EuiContextMenuItemIcon } from '@elastic/eui';

import { Container } from '../containers';
import { Embeddable } from '../embeddables';

export interface ExecuteActionContext<
  E extends Embeddable = Embeddable,
  C extends Container = Container,
  AC extends {} = {}
> {
  embeddable: E;
  container?: C;
  triggerContext?: AC;
}

export interface ActionContext<E extends Embeddable = Embeddable, C extends Container = Container> {
  embeddable: E;
  container?: C;
}

export abstract class Action<
  E extends Embeddable = Embeddable,
  C extends Container = Container,
  T extends {} = {},
  U = undefined
> {
  // Used to determine the order when there is more than one action matched to a trigger.
  // Higher numbers are displayed first.
  public priority: number = 0;

  // If specified, this action is compatible with only the given type.
  public embeddableType: string = '';

  public description: string = '';

  public embeddableTemplateMapping: { [key: string]: string } = {};

  constructor(
    public readonly id: string,
    protected getDataFromUser?: (context: ExecuteActionContext<E, C, T>) => Promise<U>
  ) {}

  public getIcon(context: ActionContext): EuiContextMenuItemIcon | undefined {
    return undefined;
  }

  public abstract getTitle(context: ActionContext): string;

  public isSingleton() {
    return false;
  }

  public allowDynamicTriggerMapping() {
    return true;
  }

  public isCompatible({ embeddable }: ActionContext<E, C>): Promise<boolean> {
    if (this.embeddableType !== '') {
      return Promise.resolve(!!embeddable && embeddable.type === this.embeddableType);
    } else {
      return Promise.resolve(true);
    }
  }

  public async requestUserContext() {}

  public abstract execute(context: ExecuteActionContext<E, C, T>): void;

  public allowTemplateMapping() {
    return true;
  }

  public allowEditing() {
    return true;
  }
}
