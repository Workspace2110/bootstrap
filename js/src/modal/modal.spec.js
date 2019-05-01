import Modal from './modal'
import EventHandler from '../dom/eventHandler'

/** Test helpers */
import { getFixture, clearFixture } from '../../tests/helpers/fixture'

describe('Modal', () => {
  let fixtureEl

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(Modal.VERSION).toEqual(jasmine.any(String))
    })
  })

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(Modal.Default).toEqual(jasmine.any(Object))
    })
  })

  describe('toggle', () => {
    it('should toggle a modal', done => {
      fixtureEl.innerHTML = '<div class="modal"><div class="modal-dialog" /></div>'

      const modalEl = fixtureEl.querySelector('.modal')
      const modal = new Modal(modalEl)

      modalEl.addEventListener('shown.bs.modal', () => {
        modal.toggle()
      })

      modalEl.addEventListener('hidden.bs.modal', () => {
        expect().nothing()
        done()
      })

      modal.toggle()
    })
  })

  describe('show', () => {
    it('should show a modal', done => {
      fixtureEl.innerHTML = '<div class="modal"><div class="modal-dialog" /></div>'

      const modalEl = fixtureEl.querySelector('.modal')
      const modal = new Modal(modalEl)

      modalEl.addEventListener('show.bs.modal', e => {
        expect(e).toBeDefined()
      })

      modalEl.addEventListener('shown.bs.modal', () => {
        expect().nothing()
        done()
      })

      modal.show()
    })

    it('should show a modal and append the element', done => {
      const modalEl = document.createElement('div')
      const id = 'dynamicModal'

      modalEl.setAttribute('id', id)
      modalEl.classList.add('modal')
      modalEl.innerHTML = '<div class="modal-dialog"></div>'

      const modal = new Modal(modalEl)

      modalEl.addEventListener('shown.bs.modal', () => {
        expect(document.getElementById(id)).toBeDefined()
        done()
      })

      modal.show()
    })

    it('should do nothing if a modal is shown', () => {
      fixtureEl.innerHTML = '<div class="modal"><div class="modal-dialog" /></div>'

      const modalEl = fixtureEl.querySelector('.modal')
      const modal = new Modal(modalEl)

      spyOn(EventHandler, 'trigger')
      modal._isShown = true

      modal.show()

      expect(EventHandler.trigger).not.toHaveBeenCalled()
    })

    it('should do nothing if a modal is transitioning', () => {
      fixtureEl.innerHTML = '<div class="modal"><div class="modal-dialog" /></div>'

      const modalEl = fixtureEl.querySelector('.modal')
      const modal = new Modal(modalEl)

      spyOn(EventHandler, 'trigger')
      modal._isTransitioning = true

      modal.show()

      expect(EventHandler.trigger).not.toHaveBeenCalled()
    })

    it('should not fire shown event when show is prevented', done => {
      fixtureEl.innerHTML = '<div class="modal"><div class="modal-dialog" /></div>'

      const modalEl = fixtureEl.querySelector('.modal')
      const modal = new Modal(modalEl)

      modalEl.addEventListener('show.bs.modal', e => {
        e.preventDefault()

        const expectedDone = () => {
          expect().nothing()
          done()
        }

        setTimeout(expectedDone, 10)
      })

      modalEl.addEventListener('shown.bs.modal', () => {
        throw new Error('shown event triggered')
      })

      modal.show()
    })
  })
})
