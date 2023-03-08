
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.2.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that <...>",
    async fn(chain: Chain, accounts: Map<string, Account>) {

        let sender = accounts.get("deployer")!.address;
        let sender2 = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5"
        let block = chain.mineBlock([
            /*
             * Add transactions with:
             * Tx.contractCall(...)
            */
           Tx.contractCall("ProsperContract", "add-patient-info", [types.ascii("p1"), types.uint(8), types.ascii("b+")], sender),
           Tx.contractCall("ProsperContract", "add-doctor", [types.ascii("d1"), types.ascii("p"), types.ascii("a"), types.uint(9)], sender),
           Tx.contractCall("ProsperContract", "assign-patient-to-doctor", [sender], sender2),
           Tx.contractCall("ProsperContract", "treat-patient", [sender, types.ascii("d"), types.ascii("m"), types.uint(500)], sender2)
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 2);

        // block = chain.mineBlock([
        //     /*
        //      * Add transactions with:
        //      * Tx.contractCall(...)
        //     */
        // ]);
        // assertEquals(block.receipts.length, 0);
        // assertEquals(block.height, 3);
    },
});
