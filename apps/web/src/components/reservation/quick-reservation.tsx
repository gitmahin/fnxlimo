import { Button, Input, Label, RadioGroup, RadioGroupItem } from "@fnx/ui";

export const QuickReservation = () => {
  return (
    <div className="px-5">
      <Input
        name="reservation"
        placeholder="Reservation #"
        required
        className="mb-5"
      />
      <Input
        name="cc"
        placeholder="Last 4 digits of CC"
        required
        className="mb-5"
      />
      <Input
        name="last_name"
        placeholder="Last Name"
        required
        className="mb-5"
      />
      <div>
        <Label>Receipt Format</Label>
        <RadioGroup
          defaultValue="comfortable"
          className="flex justify-start items-center gap-3  mt-2"
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">PDF</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">HTML</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex justify-start items-center gap-3 mt-5">
        <Button variant={"secondary"}>Ok</Button>
        <Button variant={"destructive"}>Cancel</Button>
      </div>
    </div>
  );
};
