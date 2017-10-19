let headAndBodyAbbr;
let summary = '';

let workspace = document.body.querySelector('textarea[placeholder="Add comment"]');

let trfcTemplate = '- origin flights replaced by FC:\n /origin flights/\n';
trfcTemplate += '- new flights after FC:\n/new flights/\n';
trfcTemplate += '- no margin, no HF';

workspace.onkeydown = function (event) {

    if (event.which == 9) {
        event.preventDefault();

        let sumAbbr = (workspace.value).split('\n');
        let rowNumber = getCurrentRow(workspace, sumAbbr);
        let actionPart = sumAbbr[rowNumber];

        let headerAbbr = (actionPart.split('->'))[0];                       //string
        headerAbbr = (headerAbbr) ? headerAbbr : null;
        let doneRegexp;
        let doneAbbr;
        let todoAbbr = actionPart.split('-<');
        todoAbbr = todoAbbr.slice(1);                                       //it's an array, don't forget about it

        if (todoAbbr.length == 0) {
            doneRegexp = /(?:->).+/;
            doneAbbr = actionPart.match(doneRegexp);
            doneAbbr = (doneAbbr) ? doneAbbr[0].slice(2) : null;
        } else {
            doneRegexp = /(?:->).+(?:-<)/;
            doneAbbr = actionPart.match(doneRegexp);
            doneAbbr = (doneAbbr) ? doneAbbr[0].slice(2, -2) : null;
        }

        console.log('header Abbr: ' + headerAbbr);
        console.log('done Abbr: ' + doneAbbr);
        console.log('todo Abbr: ' + todoAbbr);
        console.log('create header: ' + createHeader(headerAbbr));
        console.log('create done: ' + createDone(doneAbbr));
        console.log('create todo: ' + createTodo(todoAbbr));

        sumAbbr[rowNumber] = createHeader(headerAbbr) + createDone(doneAbbr) + createTodo(todoAbbr);
        workspace.value = sumAbbr.join('\n');
    }
}

function createHeader(headAbbr) {
    if (headAbbr == null) {
        return '';
    }

    let task;
    let result = '';
    let headAbbrArr = headAbbr.split('-');

    for (let i = 0; i < headAbbrArr.length; i++) {
        switch (headAbbrArr[i].toLowerCase()) {
            case 's':
                result += '**SUMMARY**\n';
                task = "RAF";
                break;
            case 'sa':
                result += 'Summary above\n';
                break;
            case 'trfc':
                result += '**Tax refund (flight change)**\n';
                task = 'TR FC';
                break;
            case 'pr':
                result += '- pap filled RAF on proceed';
                break;
            case 'aa':
                result += '- pap filled RAF on assess amount';
                break;
            case 'bc':
                result += '/booking card\n';
                break;
            case 'pay':
                result += '/paypal\n- *payment details*\n';
                break;
            case 'b':
                result += '/bank\n- *payment details*\n';
                break;
            case 'cr':
                result += '/credits\n- *payment details*\n';
                break;
            case 'vc':
                result += '- voluntary cancellation (affected flights)\n';
                break;
            case 'va':
                result += '- voluntary assessment (affected flights)\n';
                break;
            case 'gc':
                result += '- guarantee (/route/ cancelled by a/l)\n';
                break;
            case 'gsc':
                result += '- guarantee (/route/ delayed and /routes/ affected)\n';
                break;
            case 'g':
                result += '- guarantee (affected flights)\n';
                break;
            case 'mi':
                result += '- medical issue (MC attached)\n';
                break;
            case 'bi':
                result += '- baggage issue (/details/)\n';
                break;
            case 'ci':
                result += '- check-in issue (/details/)\n';
                break;
            case 'hfy':
                result += '- HF applied';
                break;
            case 'my':
                result += ', Margin can be added (flights in future + cancellable) => /value/\n';
                break;
            case 'mn':
                result += ', no Margin\n';
                break;
            case 'hfn':
                result += '- HF not applied';
                break;
        }
    }
    if (task == 'RAF') result += "- pap's comment to RAF:\n **\n";
    if (task == 'TR FC') result += trfcTemplate;

    return result;
}

function createDone(doneAbbr) {
    if (doneAbbr == null) {
        return '';
    }

    let result = (/DONE/.test(workspace.value)) ? '' : '________________\n**DONE**\n';
    let actions = doneAbbr.split('->');

    let taxesCallRegexp = /norwe|cobalt|virgin|pegasus$|monarch|flybe|easyjet|berlin|olymp|transavia|lingus/i;
    let taxesCallOnlyAssess = /blue|vivacol|tui/i;
    let noshowRegexp = /vuel|nok|eurowings|germanwings|ew|4u|thai/i;
    let mmbRegexp = /merid|spirit|allegiant|busan|pegasus API|condor API|spice|southwest|sw|tway|sun|porter|eastarjet|cape|japan/i;
    let ncAndNrRegexp = /viet|tiger|ryan|interjet|arabia|volaris|blue panorama|scoot/i;
    let nrRegexp = /jet2|delta|frontier|jetstar|peach|pobeda|vanilla/i;
    let taxesOnMMBRegexp = /wow|sky$/i;

    for (let i = 0; i < actions.length; i++) {
        let nameAndStatus = actions[i].split(',');
        let airline = nameAndStatus[0];
        let status = nameAndStatus[1];

        result += '- /Route - PNR/\n';

        if (status == 'aa') {

            if (taxesCallRegexp.test(airline) || taxesCallOnlyAssess.test(airline)) {
                result += 'called ' + airline + '. Cancellable & Possible RA in case of cancellation/no-show - \n';
            } else if (noshowRegexp.test(airline)) {
                result += 'called ' + airline + '. NC & Possible RA in case of no-show - \n';
            } else if (mmbRegexp.test(airline)) {
                result += 'checked on ' + airline + "'s MMB Possible RA in case of cancellation - \n";
            } else if (ncAndNrRegexp.test(airline)) {
                result += 'as per ' + airline + "'s policy NC & fully NR\n";
            } else if (nrRegexp.test(airline)) {
                result += 'as per ' + airline + "'s policy Cancellable but fully NR\n";
            } else if (taxesOnMMBRegexp.test(airline)) {
                result += 'as per ' + airline + "'s policy full amount of taxes can be refunded in case of cancellation/no-show. According a/l's MMB taxes amount - \n";
            } else if (airline.toLowerCase() == 'aa' || airline.toLowerCase() == 'asia' || airline.toLowerCase() == 'air asia') {
                result += airline + ". According a/l's rules NC & only taxes after dep. can be requested (RA unknown)\n";
            } else if (airline.toLowerCase() == "mp" || /marco/i.test(airline)) {
                result += 'asked ' + airline + ' in slack. Possible RA in case of cancellation = \n';
            } else if (airline.toLowerCase() == 'mf' || /mystifly/i.test(airline)) {
                result += 'asked ' + airline + ' about possible RA in case of cancellation via emailing\n';
            } else if (airline.toLowerCase() == 'mt' || /mytrip/i.test(airline)) {
                result += 'called ' + airline + ' Possible RA in case of cancellation - \n';
            } else if (/ozon/i.test(airline)) {
                result += "Send assessment request to Ozon's agents via MMB\n";
            } else {
                result += 'called ' + airline + '. Possible RA (/cancellable or not/) - \n'
            }

        } else if (status == 'c') {

            if (ncAndNrRegexp.test(airline)) {
                result += "According " + airline + " rules flight NC & fully NR\n";
            } else if (noshowRegexp.test(airline) || airline.toLowerCase() == 'aa' || airline.toLowerCase() == 'asia') {
                result += "According " + airline + " rules NC & only taxes after dep. can be requested\n";
            } else if (nrRegexp.test(airline)) {
                result += airline + '. Cancelled on MMB without any refunds\n';
            } else if (mmbRegexp.test(airline)) {
                result += airline + '. Cancelled on MMB with RA of \n';
            } else if (taxesCallRegexp.test(airline) || /sky$/i.test(airline)) {
                result += 'Called ' + airline + '. Cancelled and applied for RA -  . This amount will be refunded withing -  wd\n';
            } else if (taxesCallOnlyAssess.test(airline) || /wow/i.test(airline)) {
                result += airline + '. Send email and applied for cancellation and refunds\n';
            } else if (airline.toLowerCase() == "mp" || /marco/i.test(airline)) {
                result += 'Applied for refunds via pkfare. Asked ' + airline + ' about RA in slack\n';
            } else if (airline.toLowerCase() == 'mf' || /mystifly/i.test(airline)) {
                result += 'Asked ' + airline + ' to proceed with refunds via emailing\n';
            } else if (airline.toLowerCase() == 'mt' || /mytrip/i.test(airline)) {
                result += 'Applied for refunds via MMB\n';
            } else if (/ozon/i.test(airline)) {
                result += "Send refund request to Ozon's agents via MMB\n";
            } else {
                result += 'Called ' + airline + '. Cancelled and applied for RA -  . This amount will be refunded withing -  wd\n';
            }
        } else if (status == 'fl') {
            if (ncAndNrRegexp.test(airline) || nrRegexp.test(airline) || airline.toLowerCase() == 'spirit') {
                result += 'flown. According ' + airline + "'s policy fully NR\n";
            } else if (noshowRegexp.test(airline)) {
                result += 'called ' + airline + '. Applied for TR for no-show. RA of  will be refunded withing   wd\n';
            } else if (taxesCallRegexp.test(airline) || /sky$/i.test(airline)) {
                result += 'flown. Called ' + airline + '. Applied for TR. RA of   wil be refunded withing  wd\n';
            } else if (taxesCallOnlyAssess.test(airline) || /wow/i.test(airline)) {
                result += 'flown. Send email to ' + airline + ' to apply for TR\n';
            } else if (/sun|pegasus API|condor API/i) {
                result += 'flown. Applied for TR via MMB. RA - \n';
            } else if (airline.toLowerCase() == "mp" || /marco/i.test(airline)) {
                result += 'flown. Asked ' + airline + ' about RA in slack and applied for TR via pkfare\n';
            } else if (airline.toLowerCase() == 'mf' || /mystifly/i.test(airline)) {
                result += 'flown. Asked ' + airline + 'to proceed with possible TR for no-show via emailing\n';
            } else if (airline.toLowerCase() == 'mt' || /mytrip/i.test(airline)) {
                result += 'flown. Applied for TR for no-show via MMB\n';
            } else if (/ozon/i.test(airline)) {
                result += 'Applied for TR for no-show via MMB\n';
            } else {
                result += 'called ' + airline + '. Applied for TR for no-show. RA -  will be refunded withing   wd\n';
            }
        } else {
            result += 'called ' + airline + ' \n';
        }
    }

    return result;
}

function createTodo(todoAbbr) {
    if (todoAbbr.length == 0) {
        return '';
    }

    let result = (/TO DO/.test(workspace.value)) ? '' : '\n**TO DO**\n';

    for (let i = 0; i < todoAbbr.length; i++) {
        switch (todoAbbr[i].toLowerCase()) {
            case 'kt':
                result += '- **Kiev Team**\npls\n';
                break;
            case 'bcl':
                result += '- **Brno Claims**\npls\n';
                break;
            case 'kcl':
                result += '- **Kiev Claims**\npls\n';
                break;
            case 'bo':
                result += "- **BO**\npls\n";
                break;
            case 'cs':
                result += '- **CS**\npls\n';
                break;
            case 'gds':
                result += '- **GDS**\npls\n';
                break;
            case 'avc':
                result += '- **AvC**\npls\n';
                break;
        }
    }

    return result;
}

function getCurrentRow(elem, abbrArr) {
    let currPos = elem.selectionStart;
    let symbolReduce = 0;

    for (let i = 0; i < abbrArr.length; i++) {
        symbolReduce += (i == 0) ? (abbrArr[i].length) : (abbrArr[i].length + 1);
        if (symbolReduce == currPos) {
            return i;
        }
    }
    return abbrArr.length - 1;
}