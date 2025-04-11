"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

import { RootState } from "@/utils/store";
import {
  addExpense,
  deleteExpense,
  getExpense,
  updateExpense,
} from "@/utils/expenseSlice";
import { ExpenseItem } from "@/type";

const defaultForm = {
  title: "",
  user: "",
  category: "",
  amount: "",
  date: "",
};

export function Tracker() {
  const expenses = useSelector((state: RootState) => state.expense);
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ExpenseItem | null>(null);
  const email = useSelector((state: RootState) => state.auth.email);
  const isOnline = useSelector((state: RootState) => state.sync.isOnline);

  useEffect(() => {
    dispatch(getExpense(email));
  }, []);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: defaultForm,
  });

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      amount: parseFloat(data.amount),
      user: email,
    };

    if (editing) {
      dispatch(
        updateExpense({ item: { ...payload, id: editing.id }, isOnline })
      );
    } else {
      dispatch(addExpense({ item: payload, isOnline }));
    }

    reset(defaultForm);
    setEditing(null);
    setDialogOpen(false);
  };

  const handleEdit = (item: ExpenseItem) => {
    setEditing(item);
    setDialogOpen(true);

    reset({
      title: item.title,
      category: item.category,
      amount: item.amount.toString(),
      date: item.date,
      user: item.user,
    });
  };

  const handleDelete = (id: string) => {
    dispatch(deleteExpense({ id, isOnline }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 mt-20">
      <h1 className="text-4xl font-bold text-left">Dashboard</h1>

      <div className="flex justify-start">
        <Button
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
        >
          Add Expense
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Expense" : "Add Expense"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input
                {...register("title", {
                  required: "Title cannot be empty",
                  min: {
                    message: "Title must be minimum 4 characters",
                    value: 3,
                  },
                })}
              />
            </div>
            <div className="space-y-1">
              <Label>Category</Label>
              <Input {...register("category", { required: true })} />
            </div>
            <div className="space-y-1">
              <Label>Amount</Label>
              <Input
                type="number"
                {...register("amount", { required: true })}
              />
            </div>
            <div className="space-y-1">
              <Label>Date</Label>
              <Input type="date" {...register("date", { required: true })} />
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit">{editing ? "Update" : "Add"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-muted">
            <tr className="text-left">
              <th className="p-3">Title</th>
              <th className="p-3">User</th>
              <th className="p-3">Category</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  No expenses found.
                </td>
              </tr>
            ) : (
              expenses.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.user}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">${item.amount.toFixed(2)}</td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3 space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
