<template>
  <ModalVue title="Export subtree">
    <div class="flex-container -vertical -gap-xl">
      <div class="flex-container -vertical -gap-lg">
        <div class="flex-container -vertical -gap-lg">
          <fieldset class="fieldset">
            <legend class="fieldset--legend">{{ $t('names') }}</legend>
            <div class="flex-container -gap-lg">
              <div class="flex-container -gap-xs -align-start">
                <input
                  type="radio"
                  id="scientific"
                  name="names"
                  value="scientific"
                  class="input"
                  :checked="nameFormat === 'scientific'"
                  @input="changeNameFormat('scientific')"
                />
                <label for="scientific">{{ $t('scientific') }}</label>
              </div>
              <div class="flex-container -gap-xs -align-start">
                <input
                  type="radio"
                  id="taxid"
                  name="names"
                  value="taxid"
                  class="input"
                  :checked="nameFormat === 'taxid'"
                  @input="changeNameFormat('taxid')"
                />
                <label for="taxid">Taxid</label>
              </div>
              <div class="flex-container -gap-xs -align-start">
                <input
                  type="radio"
                  id="both"
                  name="names"
                  value="both"
                  class="input"
                  :checked="nameFormat === 'full'"
                  @input="changeNameFormat('full')"
                />
                <label for="both">{{ $t('both') }}</label>
              </div>
            </div>
          </fieldset>
          <div>
            <div class="flex-container -gap-lg">
              <div class="flex-container -gap-xs -align-start">
                <input
                  type="checkbox"
                  id="remove-singletons"
                  name="remove-singletons"
                  class="input"
                  :checked="!singletons"
                  @input.stop.prevent="toggleSingletons"
                />
                <label for="remove-singletons">{{ $t('remove-singletons') }}</label>
              </div>
              <div class="flex-container -gap-xs -align-start">
                <input
                  type="checkbox"
                  id="remove-node-names"
                  name="remove-node-names"
                  class="input"
                  :checked="!nodeNames"
                  @input.stop.prevent="toggleNodeNames"
                />
                <label for="remove-node-names">{{ $t('remove-node-names') }}</label>
              </div>
            </div>
          </div>
        </div>
        <textarea class="textarea" rows="9" :value="formattedSubtree" readonly ref="textarea"></textarea>
      </div>
      <div class="flex-container -horizontal-reverse" @click.prevent.stop="copyToClipboard">
        <button class="button -shade-85" @click.stop.prevent="close">{{ $t('cancel') }}</button>
        <button class="button -shade-0">{{ $t('copy') }}</button>
      </div>
    </div>
  </ModalVue>
</template>

<script lang="ts" src="./ExportSubtreeModal.component.ts"></script>
