import axios from 'axios'
import { $ } from './bling'

function save(e) {
    e.preventDefault();
    axios.post(this.action)
    .then(res => {
        if(this.go.value === 'Going') {
            this.go.value = 'Go'
        } else if ( this.go.value === 'Go' ) {
            this.go.value = 'Going'
        }
        $('#saved').textContent = res.data.saves.length + ' place/s saved'
    })
    .catch(console.error)
}

export default save