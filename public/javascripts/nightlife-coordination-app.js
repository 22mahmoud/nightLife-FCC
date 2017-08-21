import '../sass/style.scss';

import { $, $$ } from './modules/bling'
import autocomplete from './modules/autocomplete'
import save from './modules/save'

autocomplete($('#address'))
const saves = $$('form.save')
saves.on('submit', save)
