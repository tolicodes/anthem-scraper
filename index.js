var results = [];

async function processRows() {
    var rows = Array.from($('.claims-summary-accordion-toggle'));

    for(let i = 0; i < rows.length; i++) {
        var row = $(rows[i]);

        if (row.find('.motif-user-remove').length) {
            row.find('.uxd-expansion-button').click();
            console.log('clicked')
            
            await new Promise(resolve => setTimeout(resolve, 2000));

            var serviceDateText = row.find('.service-on-col').text();
            console.log('serviceDateText', serviceDateText)
            var match = serviceDateText.match(/\d{2}\/\d{2}\/\d{4}/);
            var serviceDate = match ? match[0] : null;

            if (serviceDate === null) {
                continue;
            }

            var panel = row.closest('uxd-expansion-panel');
            var lastRow = panel.find('.table-row:last-child');
            var planPaid = lastRow.find('[data-th="Plan paid"]').text();
            console.log("planPaid", planPaid)

            var memberPaid = lastRow.find('[data-th="What you pay"]').text();

            var caseNumber = panel.find('.claims-case-number').text();

            var provider = panel.find('.claims-medical-description').text();

            var record = {
                serviceDate: serviceDate,
                planPaid: planPaid,
                memberPaid: memberPaid,
                caseNumber: caseNumber,
                provider: provider
            };

            results.push(record);
            console.log('results', results)
        }
    }
}

processRows();
