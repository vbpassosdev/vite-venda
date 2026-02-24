import type { ComponentProps } from "react";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PedidoPrint } from "../print/PedidoPrint";

type PedidoPageProps = {
  pedido: ComponentProps<typeof PedidoPrint>["pedido"];
  autoPrint?: boolean;
};

export function PedidoPage({ pedido, autoPrint = false }: PedidoPageProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const hasAutoPrintedRef = useRef(false);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Pedido_${pedido.numero}`,
  });

  useEffect(() => {
    if (!autoPrint || hasAutoPrintedRef.current) return;
    if (pedido.itens.length === 0) return;

    hasAutoPrintedRef.current = true;
    handlePrint();
  }, [autoPrint, handlePrint, pedido.itens.length]);

  return (
    <>
      <button onClick={handlePrint}>Imprimir Pedido</button>

      <div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: "-10000px",
          width: "210mm",
          zIndex: -1,
        }}
      >
        <PedidoPrint ref={printRef} pedido={pedido} />
      </div>
    </>
  );
}