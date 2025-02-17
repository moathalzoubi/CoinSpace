import Ractive from 'ractive/runtime.js';
if (process.env.NODE_ENV === 'production') {
  Ractive.DEBUG = false;
}
import { translate } from 'lib/i18n';

// extracted from https://github.com/RactiveJS/Ractive-events-keys
const makeKeyDefinition = function( code ) {
  return function( node, fire ) {
    let keydownHandler;

    node.addEventListener( 'keydown', keydownHandler = function( event ) {
      const which = event.which || event.keyCode;

      if ( which === code || (code instanceof Array && code.indexOf(which) !== -1) ) {
        event.preventDefault();

        fire({
          node,
          original: event,
        });
      }
    }, false );

    return {
      teardown() {
        node.removeEventListener( 'keydown', keydownHandler, false );
      },
    };
  };
};

const { events } = Ractive;

events.enter = makeKeyDefinition(13);
events.tab = makeKeyDefinition(9);
events.escape = makeKeyDefinition(27);
events.space = makeKeyDefinition(32);

events.leftarrow = makeKeyDefinition(37);
events.rightarrow = makeKeyDefinition(39);
events.downarrow = makeKeyDefinition(40);
events.uparrow = makeKeyDefinition(38);
events.backspace = makeKeyDefinition(8);

events.number = makeKeyDefinition([48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);

const { partials } = Ractive;

partials.svg_arrow = require('lib/svg/arrow.ract');
partials.svg_cancel = require('lib/svg/cancel.ract');
partials.svg_caret = require('lib/svg/caret.ract');
partials.svg_close = require('lib/svg/close.ract');
partials.svg_exit = require('lib/svg/exit.ract');
partials.svg_help = require('lib/svg/help.ract');
partials.svg_hex_large = require('lib/svg/hex_large.ract');
partials.svg_history = require('lib/svg/history.ract');
partials.svg_logo_stack = require('lib/svg/logo_stack.ract');
partials.svg_logo = require('lib/svg/logo.ract');
partials.svg_qr = require('lib/svg/qr.ract');
partials.svg_expand = require('lib/svg/expand.ract');
partials.svg_email = require('lib/svg/email.ract');
partials.svg_receive = require('lib/svg/receive.ract');
partials.svg_refresh = require('lib/svg/refresh.ract');
partials.svg_send = require('lib/svg/send.ract');
partials.svg_sendto = require('lib/svg/sendto.ract');
partials.svg_settings = require('lib/svg/settings.ract');
partials.svg_success = require('lib/svg/success.ract');
partials.svg_letter_t = require('lib/svg/letter_t.ract');
partials.svg_token = require('lib/svg/token.ract');
partials.svg_user = require('lib/svg/user.ract');
partials.svg_mecto = require('lib/svg/mecto.ract');
partials.svg_warning = require('lib/svg/warning.ract');
partials.svg_mecto_not_found = require('lib/svg/mecto_not_found.ract');
partials.svg_exchange = require('lib/svg/exchange.ract');
partials.svg_error = require('lib/svg/error.ract');
partials.svg_changelly = require('lib/svg/changelly.ract');
partials.svg_backspace = require('lib/svg/backspace.ract');
partials.svg_fingerprint = require('lib/svg/fingerprint.ract');
partials.svg_faceid = require('lib/svg/faceid.ract');
partials.svg_trash = require('lib/svg/trash.ract');
partials.svg_moonpay = require('lib/svg/moonpay.ract');
partials.svg_btcdirect = require('lib/svg/btcdirect.ract');
partials.svg_onramper = require('lib/svg/onramper.ract');
partials.svg_guardarian = require('lib/svg/guardarian.ract');

Ractive.prototype.hide = function(context) {
  this.fire('before-hide', context);
  this.el.classList.remove('current');
};

Ractive.prototype.show = function(context) {
  this.fire('before-show', context);
  this.el.classList.add('current');
};

Ractive.defaults.data = {
  translate,
  BUILD_TYPE: process.env.BUILD_TYPE,
  BUILD_PLATFORM: process.env.BUILD_PLATFORM,
};

Ractive.decorators['numbers'] = (node) => {
  let keypressHandler;
  node.addEventListener('keypress', keypressHandler = (event) => {
    const charCode = event.keyCode || event.which;
    const charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/)) {
      event.preventDefault();
    }
  });
  return {
    teardown() {
      node.removeEventListener('keypress', keypressHandler);
    },
  };
};

export default Ractive;
