import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Withdrawal() {
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  // ✅ Load user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("🧠 Stored user (raw):", storedUser);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("✅ Parsed user:", parsedUser);
        setUser(parsedUser);
      } catch {
        console.error("❌ Invalid user data in localStorage");
      }
    } else {
      console.warn("⚠️ No user found in localStorage");
    }
  }, []);

  // ✅ Function to send the actual withdrawal request
  async function sendWithdrawalTx(dataObj: any) {
    console.log("🚀 sendWithdrawalTx CALLED with:", dataObj);

    try {
      const response = await fetch(
        `https://wealt-render.onrender.com/transactions/${dataObj._id}/withdrawal`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataObj),
        }
      );

      console.log("🌐 Response status:", response.status);

      if (!response.ok) {
        console.error("❌ API error:", response.status, response.statusText);
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("✅ Withdrawal API result:", result);

      toast({
        title: "Withdrawal Requested",
        description:
          "Withdrawal request successfully sent. Please wait a few minutes for account update.",
      });

      return result.data;
    } catch (error) {
      console.error("❌ Withdrawal error:", error);
      toast({
        title: "Error",
        description: "Request failed or timed out.",
        variant: "destructive",
      });
      return null;
    }
  }

  // ✅ Form submission handler
  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🟢 handleWithdrawal triggered");

    if (!wallet || !amount || !address) {
      console.log("⚠️ Missing fields:", { wallet, amount, address });
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    console.log("🧾 Current user state:", user);

    if (!user) {
      console.log("⚠️ No user found in state");
      toast({
        title: "Error",
        description: "User information not found. Please log in again.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const timestamp = new Date().toISOString();

    const dataObj = {
      amount: parseFloat(amount),
      method: wallet,
      address,
      _id: user._id,
      from: user.from,
      timestamp,
      balance: user.balance,
    };

    console.log("📤 DataObj before send:", dataObj);

    const result = await sendWithdrawalTx(dataObj);
    console.log("🟣 sendWithdrawalTx result:", result);

    if (result) {
      console.log("✅ Withdrawal sent successfully");
    } else {
      console.warn("⚠️ Withdrawal failed or returned null");
    }

    setLoading(false);
    setAmount("");
    setAddress("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Withdrawal</h1>
        <p className="text-muted-foreground">
          Request a withdrawal from your account
        </p>
      </div>

      <Card className="p-6 max-w-2xl">
        <h2 className="text-xl font-semibold mb-6">Make Withdrawal</h2>

        <form onSubmit={handleWithdrawal} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="wallet-withdrawal">Withdrawal Method</Label>
            <Select value={wallet} onValueChange={setWallet}>
              <SelectTrigger id="wallet-withdrawal">
                <SelectValue placeholder="Select a Wallet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bitcoin">Bitcoin</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="usdt">USDT (TRC20)</SelectItem>
                <SelectItem value="usdt-erc20">USDT (ERC20)</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount-withdrawal">Amount ($)</Label>
            <Input
              id="amount-withdrawal"
              type="number"
              step="0.01"
              placeholder="Enter Amount ($)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Wallet Address / Bank Account</Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter your wallet address or bank account"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="p-4 bg-muted/50 rounded-lg border">
            <p className="text-sm text-muted-foreground">
              Please note: Withdrawals may take 1–3 business days to process. A
              processing fee may apply.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing..." : "Request Withdrawal"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
