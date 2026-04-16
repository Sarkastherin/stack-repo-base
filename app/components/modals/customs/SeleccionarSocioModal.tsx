import { TextInput, ListGroup, ListGroupItem } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSociosComercial } from "~/context/SociosComercialesContext";
import type { SocioComercial } from "~/types/socios";
import { Spinner } from "flowbite-react";
export function SeleccionarSocioModal({
  onSelect,
  tipoSocio
}: {
  onSelect: (item: SocioComercial) => void;
  tipoSocio: "cliente" | "proveedor";
}) {
  const { socios, getSociosData } = useSociosComercial();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<SocioComercial[]>(socios || []);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!socios || socios.length === 0) {
      void getSociosData();
    } else {
      setIsLoading(false);
      setFilteredData(socios.filter(s => s.tipo === tipoSocio));
    }
  }, [getSociosData, socios]);
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const lowercasedValue = value.toLowerCase();
    const filtered = socios?.filter((item) =>
      item.razon_social.toLowerCase().includes(lowercasedValue),
    );
    setFilteredData(filtered || []);
  };
  return (
    <div>
      <TextInput
        type="search"
        placeholder={`Buscar ${tipoSocio}...`}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        autoFocus
      />
      {isLoading ? (
        <div className="flex justify-center items-center py-6">
          <Spinner aria-label="Cargando clientes..." />
        </div>
      ) : (
        <ListGroup className="mt-2 max-h-64 overflow-y-auto p-1">
          {filteredData.length === 0 ? (
            <ListGroupItem disabled>Sin resultados</ListGroupItem>
          ) : (
            filteredData.map((item) => (
              <ListGroupItem key={item.id} onClick={() => onSelect(item)}>
                <div className="flex justify-between w-full">
                  <span>{item.razon_social}</span>
                </div>
              </ListGroupItem>
            ))
          )}
        </ListGroup>
      )}
    </div>
  );
}
